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
    
    private products: Array<Object>;

    private valueCtrl: FormControl;

    private filteredValues: any;

    private filteredImages: Array<Object>;

    private filteredTitles: Array<string>;

    private searchQuery:string = '';

    constructor(
        private dictionary: Dictionary,
        private router: Router,
        private productsService: ProductsService
    ) {
      this.products = productsService.getProducts();
      this.addTypeaheadField();
      // on categories update we update the local array
      this.productsService.productsUpdate.subscribe(products => this.onProductsUpdate(products));
      
    };

    private onProductsUpdate(products) {
      this.products = products;
      this.addTypeaheadField();
    }

    private addTypeaheadField() {
      this.valueCtrl = new FormControl();
      this.filteredTitles = this.products.map((product) => {
        return product['title'][this.dictionary['language']];
      });
      this.filteredImages = this.products.map((product) => {
        return product['main_image'];
      });
      // this.valueCtrl.valueChanges.subscribe(data => this.filterValues(data));

      this.filteredValues = this.valueCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterValues(name));
    }

    filterValues(val) {
      return val ? this.filteredTitles.filter((s) => new RegExp(val, 'gi').test(s)) : this.filteredTitles;
    }

    private onProductSelect(selected) {
      this.searchQuery = '';
      this.router.navigate(['/details/', selected.item.link]);
    }
}
