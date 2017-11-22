import { Injectable, EventEmitter } from '@angular/core';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class CategoriesService {
    // will be used when we have live update of products and everything is dynamic
    public categoriesUpdate: EventEmitter<any>;
    /**
    * @info: Contains all of the categories
    */
    public categoryArray = Array<Object>();

    /**
    * @getCategories get all categories
    * @return {Array} all categoties
    */
    public getCategories() {
        return this.categoryArray;
    }

    /**
    * @setCategories set all categories
    */
    public setCategories(categories) {
        this.categoryArray = categories;
        this.categoriesUpdate.emit(categories);
    }

    public getCategoryByLink(link) {
        for(var categoryCounter = 0; categoryCounter < this.categoryArray.length; categoryCounter++) {
            if(this.categoryArray[categoryCounter]['link'] == link) {
                return this.categoryArray[categoryCounter];
            }
        }
    }

    public removeCategory(id) {
        for(var categoryCounter = 0; categoryCounter < this.categoryArray.length; categoryCounter++) {
            if(this.categoryArray[categoryCounter]['_id'] == id) {
                this.categoryArray.splice(categoryCounter, 1);
        // fire event and upadte everywhere in the admin
                return;
            }
        }
    }

    constructor() {
        this.categoriesUpdate = new EventEmitter();
    }
}
