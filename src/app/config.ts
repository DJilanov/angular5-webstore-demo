import { Injectable } from '@angular/core';

@Injectable()
// Will contain all of the urls and constants of the app
export class Config {
    // language
    public static get defaultLang():string { return 'bg'; }
    public static get languages():Array<string> { return ['bg', 'en']; }
    // urls
    public static get productsAndCategoriesUrl():string { return "http://192.168.171.63:8080/api/productsAndCategories"; }
    public static get categoriesUrl():string { return "http://192.168.171.63:8080/api/categories"; }
    public static get productsUrl():string { return "http://192.168.171.63:8080/api/products"; }
    public static get messageUrl():string { return "http://192.168.171.63:8080/api/message"; }
    public static get orderUrl():string { return "http://192.168.171.63:8080/api/order"; }
    public static get adminLoginUrl():string { return "http://192.168.171.63:8080/api/admin/login"; }

    // staging
    // public static get productsAndCategoriesUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/productsAndCategories"; }
    // public static get categoriesUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/categories"; }
    // public static get productsUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/products"; }
    // public static get messageUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/message"; }
    // public static get orderUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/order"; }
    // public static get adminLoginUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/admin/login"; }

    // production
    // public static get productsAndCategoriesUrl():string { return "http://194.79.15.134:8080/api/productsAndCategories"; }
    // public static get categoriesUrl():string { return "http://194.79.15.134:8080/api/categories"; }
    // public static get productsUrl():string { return "http://194.79.15.134:8080/api/products"; }
    // public static get messageUrl():string { return "http://194.79.15.134:8080/api/message"; }
    // public static get orderUrl():string { return "http://194.79.15.134:8080/api/order"; }
    // public static get adminLoginUrl():string { return "http://194.79.15.134:8080/api/admin/login"; }
}
