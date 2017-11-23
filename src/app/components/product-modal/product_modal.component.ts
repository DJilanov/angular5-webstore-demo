import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Dictionary } from '../../dictionary/dictionary.service';
import { FetcherService } from '../../services/fetcher.service';
import { ProductsService } from '../../services/products.service';
import { CategoriesService } from '../../services/categories.service';
import { EventEmiterService } from '../../services/event.emiter.service';
import { ErrorHandlerService } from '../../services/error.handler.service';

@Component({
    selector: 'product-modal',
    styleUrls: ['./product_modal.component.css'],
    templateUrl: './product_modal.component.html'
})

export class ProductModalComponent {
    public title:string;
    public images: Object = {
        mainImage: '',
        moreImages: []
    };
    public submited: boolean = false;
    public categories: Array<Object>;
    // TODO: move that predefinitions to better place
    public formOptions;

    public ngForm: FormGroup;

    @ViewChild('productModal') public productModal;

    constructor(
        public dictionary: Dictionary,
        public authService: AuthService,
        public fetcherService: FetcherService,
        public productsService: ProductsService,
        public categoriesService: CategoriesService,
        public eventEmiterService: EventEmiterService,
        public errorHandlerService: ErrorHandlerService
    ) {
        this.buildReactiveForm(this.formOptions);
        this.categories = this.categoriesService.getCategories();
        this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
        this.eventEmiterService.hideProductModal.subscribe(options => this.hideProductModal());
        this.eventEmiterService.showProductModal.subscribe(options => this.showProductModal(options));
    }

    /**
    * @showUserModal used to show the user modal with the data we sended to it
    * @options {Object} user data
    */
    public showProductModal(options):void {
        // Fix ng-2 bootstrap issue
        this.productModal.config.backdrop = false;
        this.productModal.show();
        this.title = options.title;
        this.formOptions = options;
        this.buildReactiveForm(options);
    }

    /**
    * @hideUserModal used to hide user modal
    */
    public hideProductModal():void {
        this.productModal.hide();
        // there is issue with the ng2 modal...
        if(document.getElementsByTagName('bs-modal-backdrop')[0]) {
            document.getElementsByTagName('bs-modal-backdrop')[0].remove();
        }
    }

    /**
    * @onSubmit when we use the form to update the user we must reinit the formgroup using the options
    * @formData {Object} data with options of the form
    * @action {String} action of the form ( submit, delete , update )
    */
    public onSubmit(action):void {
        event.preventDefault();
        let formValues = this.ngForm.value;
        // we set the params
        this.formOptions['product'] = {
            "_id": this.formOptions['product']._id,
            "carousel": formValues.carousel,
            "count": formValues.count,
            "daily_offer": formValues.daily_offer,
            "description": {
                "bg": '',
                "en": ''
            },
            "is_new": formValues.is_new,
            "link": formValues.link,
            "category": formValues.category,
            "make": formValues.make,
            "more_details": {
                "bg": '',
                "en": ''
            },
            "more_info": {
                "bg": '',
                "en": ''
            },
            "new_price": formValues.new_price,
            "old_price": formValues.old_price,
            "params": {
                "bg": [],
                "en": []
            },
            "rating": formValues.rating,
            "shown": formValues.shown,
            "title": {
                "bg": '',
                "en": ''
            },
            "typeahed": formValues.typeahed,
            "zIndex": formValues.zIndex,
            "main_image": this.formOptions['product'].main_image,
            "other_images": this.formOptions['product'].other_images

        };
        let otherImages = [];
        for(let otherImagesCounter = 0; otherImagesCounter < this.formOptions['product'].other_images.length; otherImagesCounter++) {
            if((this.formOptions['product'].other_images[otherImagesCounter] !== null) && (this.formOptions['product'].other_images[otherImagesCounter].name !== undefined)) {
                otherImages.push(this.formOptions['product'].other_images[otherImagesCounter]);
            }
        }
        this.formOptions['product'].other_images = otherImages;
        // we set the description
        this.formOptions['product'].description.bg = formValues.descriptionBG;
        this.formOptions['product'].description.en = formValues.descriptionEN;
        // we set the more details
        this.formOptions['product'].more_details.bg = formValues.more_detailsBG;
        this.formOptions['product'].more_details.en = formValues.more_detailsEN;
        // we set the more info
        this.formOptions['product'].more_info.bg = formValues.more_infoBG;
        this.formOptions['product'].more_info.en = formValues.more_infoEN;
        // we set the title
        this.formOptions['product'].title.bg = formValues.titleBG;
        this.formOptions['product'].title.en = formValues.titleEN;

        // we set the more params
        for(let key in formValues){
           if(formValues.hasOwnProperty(key)){
                // we set the params
                if(key.indexOf("paramsBG") === 0){
                    this.formOptions['product'].params.bg[this.formOptions['product'].params.bg.length] = formValues[key];
                }
                if(key.indexOf("paramsEN") === 0){
                    this.formOptions['product'].params.en[this.formOptions['product'].params.en.length] = formValues[key];
                }
            }
        }

        let loginData = this.authService.getLoginData();
        let body = Object.assign(loginData, {'product': this.formOptions['product']});
        const formData = new FormData();
        for(var i = 0; i < otherImages.length; i++){
            formData.append('other_images', otherImages[i]);
        }
        formData.append('main_image', this.formOptions['product'].main_image);
        formData.append('body', JSON.stringify(body));

        if(action == 'create') {
            this.fetcherService.createProduct(formData).subscribe(
                data => this.successUpdate(data.json(), action),
                err => this.errorHandlerService.handleError(err)
            );
        } else if(action == 'edit') {
            this.fetcherService.updateProduct(formData).subscribe(
                data => this.successUpdate(data.json(), ''),
                err => this.errorHandlerService.handleError(err)
            );
        } else if(action == 'delete') {
            this.fetcherService.deleteProduct(body).subscribe(
                data => this.successUpdate(data.json(), action),
                err => this.errorHandlerService.handleError(err)
            );
        } 
        this.submited = true;
    }

    public fileChangeEvent() {
        if(event.target['name'] == 'main_image') {
            this.formOptions['product'].main_image = event.target['files'][0];
        } else {
            this.formOptions['product'].other_images[parseInt(event.target['name'].split("more_images")[1])] = event.target['files'][0];
        }
    }

    public successUpdate(data, action) {
        if(action == 'create') {
            this.productsService.addProduct(data.response);
        } else if(action == 'delete') {
            this.productsService.removeProduct(data.response['_id']);
        }
        this.eventEmiterService.emitChangedProduct(data);
        this.enableButtons();
        this.hideProductModal();
    }

    /**
    * @enableButtons when the callback from the server is recieved or we close the modal we enable the buttons of the modal
    */
    public enableButtons():void {
        this.submited = false;
    }

    public onFetchedData(data) {
        this.categories = data.categories;
    }

    public buildReactiveForm(options) {
        let formGroup = {
            "carousel": new FormControl(options.product.carousel, [<any>Validators.required]),
            "count": new FormControl(options.product.count, [<any>Validators.required]),
            "daily_offer": new FormControl(options.product.daily_offer, [<any>Validators.required]),
            "descriptionBG": new FormControl(options.product.description.bg, [<any>Validators.required]),
            "descriptionEN": new FormControl(options.product.description.en, [<any>Validators.required]),
            "is_new": new FormControl(options.product.is_new, [<any>Validators.required]),
            "link": new FormControl(options.product.link, [<any>Validators.required]),
            "category": new FormControl(options.product.category, [<any>Validators.required]),
            "make": new FormControl(options.product.make, [<any>Validators.required]),
            "more_detailsBG": new FormControl(options.product.more_details.bg, [<any>Validators.required]),
            "more_detailsEN": new FormControl(options.product.more_details.en, [<any>Validators.required]),
            "more_infoBG": new FormControl(options.product.more_info.bg, [<any>Validators.required]),
            "more_infoEN": new FormControl(options.product.more_info.en, [<any>Validators.required]),
            "new_price": new FormControl(options.product.new_price, [<any>Validators.required]),
            "old_price": new FormControl(options.product.old_price, [<any>Validators.required]),
            "rating": new FormControl(options.product.rating, [<any>Validators.required]),
            "shown": new FormControl(options.product.shown, [<any>Validators.required]),
            "titleBG": new FormControl(options.product.title.bg, [<any>Validators.required]),
            "titleEN": new FormControl(options.product.title.en, [<any>Validators.required]),
            "typeahed": new FormControl(options.product.typeahed, [<any>Validators.required]),
            "zIndex": new FormControl(options.product.zIndex, [<any>Validators.required]),
            "main_image": new FormControl(options.product.main_image, [<any>Validators.required]),
        };
        // set the other images array
        let size = options.product.other_images.length;
        if(options.product.other_images.length < 3) {
            size = 3;
        }
        for(var otherImagesCounter = 0; otherImagesCounter < size; otherImagesCounter++) {
            formGroup['other_images' + otherImagesCounter] = new FormControl(options.product.other_images[otherImagesCounter], [<any>Validators.required]);
        }
        // when you have older item that doesnt have params
        if(!options.product.params) {
            options.product.params = {
                bg: ['','',''],
                en: ['','','']
            }
        }

        // set the params array
        let params = options.product.params.bg.length;
        if(params < 3) {
            params = 3;
        }
        for(var paramsCounter = 0; paramsCounter < params; paramsCounter++) {
            formGroup['paramsBG' + paramsCounter] = new FormControl(options.product.params.bg[paramsCounter], [<any>Validators.required]);
            formGroup['paramsEN' + paramsCounter] = new FormControl(options.product.params.en[paramsCounter], [<any>Validators.required]);
        }
        
        this.ngForm = new FormGroup(formGroup);
    }
    // refactor it when have time
    public convert(string) {
        return eval('this.' + string);
    }
}
