import { Injectable } from '@angular/core';
import { ProductAndCategories } from './productAndCategories';

@Injectable()
export class Cache {
    // the variables containing the language jsons
    // will contain the default language
    private language: string = ''; 
    // will return the texts from witch we fill our forms
    public getProductAndCategories() {
        return this.productAndCategories.cache
    };

    constructor(private productAndCategories: ProductAndCategories) {};
}