import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

/**
 * @EventBusService used for connections between modules
 */
export class EventBusService {

    public loggedIn: EventEmitter<any>;
	public translate: EventEmitter<any>;
	public changeRoute: EventEmitter<any>;
	public requestError: EventEmitter<any>;
	public changeLanguage: EventEmitter<any>;
	public productsUpdate: EventEmitter<any>;
	public messagesUpdate: EventEmitter<any>;
	public categoriesUpdate: EventEmitter<any>;

	public changeSharedOptions: EventEmitter<any>;

	constructor() {
		this.loggedIn = new EventEmitter();
		this.translate = new EventEmitter();
		this.changeRoute = new EventEmitter();
		this.requestError = new EventEmitter();
		this.changeLanguage = new EventEmitter();
		this.productsUpdate = new EventEmitter();
		this.messagesUpdate = new EventEmitter();
		this.categoriesUpdate = new EventEmitter();

		this.changeSharedOptions = new EventEmitter();		
	}

	public emitLoggedIn(loginData) {
		this.loggedIn.emit(loginData);
	}
	
	public emitTranslate(eventData) {
		this.translate.emit(eventData);
	}
	
	public emitChangeRoute(data) {
		this.changeRoute.emit(data);
	}

	public emitRequestError(data) {
		this.requestError.emit(data);
	}
	
	public emitChangeLanguage(language) {
		this.changeLanguage.emit(language);
	}
	
	public emitProductsUpdate(products) {
		this.productsUpdate.emit(products);
	}
	
	public emitMessagesUpdate(messages) {
		this.messagesUpdate.emit(messages);
	}
	
	public emitCategoriesUpdate(categories) {
		this.categoriesUpdate.emit(categories);
	}
	
	public emitChangeSharedOptions(sharedOptions) {
		this.changeSharedOptions.emit(sharedOptions);
	}
}
