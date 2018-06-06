import { CartProductModel } from './cart-product.model';

export class CartModel {
	products: CartProductModel[];	

	constructor(
		products?: CartProductModel[]
	) {
		this.products = products;
	}
}
