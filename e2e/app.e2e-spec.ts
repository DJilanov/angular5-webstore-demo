import { DJBoilerplateWebPage } from './app.po';

describe('angular5-service-bus-boilerplate App', function () {
	let page: DJBoilerplateWebPage;

	beforeEach(() => {
		page = new DJBoilerplateWebPage();
	});

	it('should display message saying app works', () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual('app works!');
	});
});
