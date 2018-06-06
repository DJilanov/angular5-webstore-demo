export class ParamsModel {
	bg: Array<string>;
	en: Array<string>;

	constructor(
		bg?: Array<string>,
		en?: Array<string>,
	) {
		this.bg = bg;
		this.en = en;
	}
}
