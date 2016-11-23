import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Dictionary } from '../../../dictionary/dictionary.service';
import { EventEmiterService } from '../../../services/event.emiter.service';

@Component({
    selector: 'admin-product-modal',
    styleUrls: ['./admin_product_modal.component.css'],
    templateUrl: './admin_product_modal.component.html'
})

export class AdminProductModalComponent {
    private title:string;
    private submited: boolean = false;
    private ngForm : FormGroup;
    // TODO: move that predefinitions to better place
    private formOptions: Object = {
        'product': {},
        'action': '',
        'title': '', 
        "btnText": ''
    };

    @ViewChild('productModal') private productModal;

    /**
    * @showUserModal used to show the user modal with the data we sended to it
    * @options {Object} user data
    */
    private showProductModal(options):void {
        this.productModal.show();
        this.title = options.title;
        this.formOptions = options;
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
    private onSubmit(formData):void {
        event.preventDefault();
        this.submited = true;
        let formObject = Object.assign(formData.value, {'id':this.formOptions['user'].id});
        // this.eventEmiterService.emitUpdateUser({
        //     'form': formObject,
        //     'options': this.formOptions,
        //     'id': this.formOptions['product'].id,
        //     'action': this.formOptions['action']
        // });
    }

    /**
    * @enableButtons when the callback from the server is recieved or we close the modal we enable the buttons of the modal
    */
    private enableButtons():void {
        this.submited = false;
    }

    constructor(
        private dictionary: Dictionary,
        private eventEmiterService: EventEmiterService
    ) {
        this.eventEmiterService.hideProductModal.subscribe(options => this.hideProductModal());
        this.eventEmiterService.showProductModal.subscribe(options => this.showProductModal(options));
    }
}
