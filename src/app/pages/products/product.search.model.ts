export class SearchModel {
	category: string;
	title: string;
	newPrice: number;
	count: number;
	isOnCarousel: boolean;
	

	constructor(
		category?: string,
		title?: string,
		newPrice?: number,
		count?: number,
		isOnCarousel?: boolean
	) {
		this.category = category;
		this.title = title;
		this.newPrice = newPrice;
		this.count = count;
		this.isOnCarousel = isOnCarousel;
	}
}
