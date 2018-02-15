export class SearchModel {
	name: string;
	title: string;
	link: string;
	shownOnNav: boolean;
	

	constructor(
		name?: string,
		title?: string,
		link?: string,
		shownOnNav?: boolean
	) {
		this.name = name;
		this.title = title;
		this.link = link;
		this.shownOnNav = shownOnNav
	}
}
