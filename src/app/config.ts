import { Injectable } from '@angular/core';

@Injectable()
// Will contain all of the urls and constants of the app
export class Config {
    // language
    public static get defaultLang():string { return 'bg'; }
    public static get languages():Array<string> { return ['bg', 'en']; }
    // urls
    // public static get productsAndCategoriesUrl():string { return "http://4055c814.ngrok.io/api/productsAndCategories"; }
    // public static get categoriesUrl():string { return "http://4055c814.ngrok.io/api/categories"; }
    // public static get productsUrl():string { return "http://4055c814.ngrok.io/api/products"; }
    // public static get messageUrl():string { return "http://4055c814.ngrok.io/api/message"; }

    // staging
    public static get productsAndCategoriesUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/productsAndCategories"; }
    public static get categoriesUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/categories"; }
    public static get productsUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/products"; }
    public static get messageUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/message"; }

    public static get mapCoordinates():Object { return { lat: 42.711330, lng: 23.375995, zoom: 13 }; }
}
