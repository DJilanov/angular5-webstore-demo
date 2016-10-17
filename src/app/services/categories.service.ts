import { Injectable, EventEmitter } from '@angular/core';

import { Config } from '../config';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class CategoriesService {

    public categoriesUpdate: EventEmitter<any>;
    /**
    * @info: Contains all of the categories
    */
    private categoryArray = Array<Object>();

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

    constructor() {
        this.categoriesUpdate = new EventEmitter();
    }
}
