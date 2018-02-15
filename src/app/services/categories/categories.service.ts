import { Injectable, EventEmitter } from '@angular/core';

import { CategoryModel } from './category.model';

import { EventBusService } from '../../core/event-bus/event-bus.service';

@Injectable()

/**
 * @CategoriesService used to contain the categories and work over them
 */
export class CategoriesService {
    /**
    * @info: Contains all of the categories
    */
    private categoryArray: CategoryModel[];
    
    constructor(
        private eventBusService: EventBusService
    ) {
        // eventBusService.categoriesUpdate.subscribe((eventData) => this.setCategories(eventData.categories));
    }

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
    public setCategories(categories: CategoryModel[]) {
        this.categoryArray = categories;
        this.emitCategories();
    }
    
    /**
    * @getCategoryByLink 
    */
    public getCategoryByLink(link) {
        for(var categoryCounter = 0; categoryCounter < this.categoryArray.length; categoryCounter++) {
            if(this.categoryArray[categoryCounter]['link'] == link) {
                return this.categoryArray[categoryCounter];
            }
        }
    }
    
    /**
    * @getCategoryById 
    */
    public getCategoryById(id) {
        for(var categoryCounter = 0; categoryCounter < this.categoryArray.length; categoryCounter++) {
            if(this.categoryArray[categoryCounter]['id'] === id) {
                return this.categoryArray[categoryCounter];
            }
        }
    }

    public addCategory(category) {
        this.categoryArray.push(category);
        this.emitCategories();
    }
    
    public updateCategory(category) {
        for(let categoriesCounter = 0; categoriesCounter < this.categoryArray.length; categoriesCounter++) {
            if(this.categoryArray[categoriesCounter]['id'] == category.id) {
                this.categoryArray[categoriesCounter] = category;
                return;
            }
        }
        this.emitCategories();
    }

    public removeCategory(category) {
        for(var categoryCounter = 0; categoryCounter < this.categoryArray.length; categoryCounter++) {
            if(this.categoryArray[categoryCounter]['_id'] == category.id) {
                this.categoryArray.splice(categoryCounter, 1);
                return;
            }
        }
        this.emitCategories();
    }
    
    /**
    * @emitCategories emit the categories to the components
    */
    public emitCategories() {
        this.eventBusService.emitCategoriesUpdate({
            categories: this.categoryArray
        });
    }
}
