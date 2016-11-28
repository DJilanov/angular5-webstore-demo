import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Dictionary } from '../../../dictionary/dictionary.service';
import { FetcherService } from '../../../services/fetcher.service';
import { EventEmiterService } from '../../../services/event.emiter.service';
import { ErrorHandlerService } from '../../../services/error.handler.service';

@Component({
    selector: 'admin-product-modal',
    styleUrls: ['./admin_product_modal.component.css'],
    templateUrl: './admin_product_modal.component.html'
})

export class AdminProductModalComponent {
    private title:string;
    private images: Object = {
        mainImage: '',
        moreImages: []
    };
    private submited: boolean = false;
    private categories: Array<Object>;
    // TODO: move that predefinitions to better place
    private formOptions: Object = {
        'product': {
            description: {

            },
            more_details: {

            },
            more_info: {

            },
            title: {

            }
        },
        'action': '',
        'title': '', 
        "btnText": ''
    };

    private ngForm: FormGroup;

    @ViewChild('productModal') private productModal;

    /**
    * @showUserModal used to show the user modal with the data we sended to it
    * @options {Object} user data
    */
    private showProductModal(options):void {
        this.productModal.show();
        this.title = options.title;
        this.formOptions = options;
        this.buildReactiveForm(options);
    }

    /**
    * @hideUserModal used to hide user modal
    */
    private hideProductModal():void {
        this.productModal.hide();
    }

    /**
    * @onSubmit when we use the form to update the user we must reinit the formgroup using the options
    * @formData {Object} data with options of the form
    * @action {String} action of the form ( submit, delete , update )
    */
    private onSubmit(action):void {
        event.preventDefault();
        debugger;
        let loginData = this.authService.getLoginData();
        let body = Object.assign(loginData, {'product': this.formOptions['product']});
        if(action == 'create') {
            this.fetcherService.createProduct(body).subscribe(
                data => this.successUpdate(data),
                err => this.errorHandlerService.handleError(err)
            );
        } else if(action == 'edit') {
            this.fetcherService.updateProduct(body).subscribe(
                data => this.successUpdate(data),
                err => this.errorHandlerService.handleError(err)
            );
        } else if(action == 'delete') {
            this.fetcherService.deleteProduct(body).subscribe(
                data => this.successUpdate(data),
                err => this.errorHandlerService.handleError(err)
            );
        } 
        this.submited = true;
    }

    private successUpdate(data) {
        this.enableButtons();
        this.hideProductModal();
    }

    /**
    * @enableButtons when the callback from the server is recieved or we close the modal we enable the buttons of the modal
    */
    private enableButtons():void {
        this.submited = false;
    }

    private onFetchedData(data) {
        this.categories = data.categories;
    }

    private buildReactiveForm(options) {
        this.ngForm = new FormGroup({
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
            "params": new FormControl(options.product.params, [<any>Validators.required]),
            "rating": new FormControl(options.product.rating, [<any>Validators.required]),
            "shown": new FormControl(options.product.shown, [<any>Validators.required]),
            "titleBG": new FormControl(options.product.title.bg, [<any>Validators.required]),
            "titleEN": new FormControl(options.product.title.en, [<any>Validators.required]),
            "typeahed": new FormControl(options.product.typeahed, [<any>Validators.required]),
            "zIndex": new FormControl(options.product.zIndex, [<any>Validators.required]),
            "main_image": new FormControl(options.product.main_image, [<any>Validators.required]),
            "other_images": new FormControl(options.product.other_images, [<any>Validators.required]),
        });
    }

    constructor(
        private dictionary: Dictionary,
        private authService: AuthService,
        private fetcherService: FetcherService,
        private eventEmiterService: EventEmiterService,
        private errorHandlerService: ErrorHandlerService
    ) {
        this.buildReactiveForm(this.formOptions);
        this.eventEmiterService.dataFetched.subscribe(data => this.onFetchedData(data));
        this.eventEmiterService.hideProductModal.subscribe(options => this.hideProductModal());
        this.eventEmiterService.showProductModal.subscribe(options => this.showProductModal(options));
    }
}
