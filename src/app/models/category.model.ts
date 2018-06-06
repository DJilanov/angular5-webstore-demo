import { LanguageModel } from './language.model';

export class CategoryModel {
	id: string;
	title: LanguageModel;
	name: LanguageModel;
	zIndex: string;
	shownOnNav: boolean;
	link: string;
	products: string;

	constructor(
		id?: string,
		title?: LanguageModel,
		name?: LanguageModel,
		zIndex?: string,
		shownOnNav?: boolean,
		link?: string,
		products?: string,
	) {
		this.id = id;
		this.title = title;
		this.name = name;
		this.zIndex = zIndex;
		this.shownOnNav = shownOnNav;
		this.link = link;
		this.products = products;
	}
}
