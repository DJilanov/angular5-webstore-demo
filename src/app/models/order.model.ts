import { LocalstorageCartModel } from './localstorage-cart.model';

export class OrderModel {
	name: string;
	email: string;
	phone: string;
    message: string;
    products: LocalstorageCartModel[]

	constructor(
		name?: string,
		email?: string,
		phone?: string,
		message?: string,
        products?: LocalstorageCartModel[]
	) {
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.message = message;
		this.products = products;
	}
}
