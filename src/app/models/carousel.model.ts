import { LanguageModel } from './language.model';

export class CarouselModel {
	title: LanguageModel;
	link: string;
	image: string;

	constructor(
		title?: LanguageModel,
		link?: string,
		image?: string
	) {
		this.title = title;
		this.link = link;
		this.image = image;
	}
}
