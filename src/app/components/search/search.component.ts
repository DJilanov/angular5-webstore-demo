import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Dictionary } from '../../dictionary/dictionary.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
    selector: 'search',
    styleUrls: ['./search.component.css'],
    templateUrl: './search.component.html'
})

export class SearchComponent {
    
    public products: Array<Object>;

    public valueCtrl: FormControl;

    public filteredValues: any;

    public filteredImages: Array<Object>;

    public filteredTitles: Array<string>;

    public searchQuery:string = '';

    constructor(
        public dictionary: Dictionary,
        public router: Router,
        public productsService: ProductsService
    ) {
      this.products = productsService.getProducts();
      this.addTypeaheadField();
      // on categories update we update the local array
      this.productsService.productsUpdate.subscribe(products => this.onProductsUpdate(products));
      
    };

    public onProductsUpdate(products) {
      this.products = products;
      this.addTypeaheadField();
    }

    public addTypeaheadField() {
      this.valueCtrl = new FormControl();
      this.filteredTitles = this.products.map((product) => {
        return product['title'][this.dictionary['language']];
      });
      this.filteredImages = this.products.map((product) => {
        return product['main_image'];
      });
      // this.valueCtrl.valueChanges.subscribe(data => this.filterValues(data));

      this.filteredValues = this.valueCtrl.valueChanges.map(name => this.filterValues(name));
    }

    filterValues(val) {
      return val ? this.filteredTitles.filter((s) => new RegExp(val, 'gi').test(s)) : this.filteredTitles;
    }

    public onProductSelect(selected) {
      this.valueCtrl.reset();
      this.router.navigate(['/details/', this.products[selected]['link']]);
    }
}
