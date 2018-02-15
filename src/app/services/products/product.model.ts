import { LanguageModel } from '../utils/language.model';

export class ProductModel {
	id: string;
	category: string;
	title: LanguageModel;
	description: LanguageModel;
	moreInfo: LanguageModel;
	moreDetails: LanguageModel;
	params: LanguageModel;
	newPrice: number;
	oldPrice: number;
	isDailyOffer: boolean;
	zIndex: number;
	isShown: boolean;
	count: number;
	rating: number;
	isNew: boolean;
	isOnCarousel: boolean;
	link: string;
	make: string;
	mainImage: string;
	otherImages: Array<string>
	

	constructor(
		id?: string,
		category?: string,
		title?: LanguageModel,
		description?: LanguageModel,
		moreInfo?: LanguageModel,
		moreDetails?: LanguageModel,
		params?: LanguageModel,
		newPrice?: number,
		oldPrice?: number,
		isDailyOffer?: boolean,
		zIndex?: number,
		isShown?: boolean,
		count?: number,
		rating?: number,
		isNew?: boolean,
		isOnCarousel?: boolean,
		link?: string,
		make?: string,
		mainImage?: string,
		otherImages?: Array<string>
	) {
		this.id = id;
		this.category = category;
		this.title = title;
		this.description = description;
		this.moreInfo = moreInfo;
		this.moreDetails = moreDetails;
		this.params = params;
		this.newPrice = newPrice;
		this.oldPrice = oldPrice;
		this.isDailyOffer = isDailyOffer;
		this.zIndex = zIndex;
		this.isShown = isShown;
		this.count = count;
		this.rating = rating;
		this.isNew = isNew;
		this.isOnCarousel = isOnCarousel;
		this.link = link;
		this.make = make;
		this.mainImage = mainImage;
		this.otherImages = otherImages;
	}
}
