import { LanguageModel } from './language.model';

export class CartProductModel {
	id: string;
	mainImage: string;
	title: LanguageModel;
    amount: number;
    price: number;

	constructor(
        id?: string,
        mainImage?: string,
        title?: LanguageModel,
		amount?: number,
		price?: number
	) {
		this.id = id;
		this.mainImage = mainImage;
		this.title = title;
		this.amount = amount;
		this.price = price;
	}
}
