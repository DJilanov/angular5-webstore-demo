import { Injectable } from '@angular/core';

@Injectable()
// Will contain all of the urls and constants of the app
export class Config {
    // language
    public static get defaultLang():string { return 'bg'; }
    public static get languages():Array<string> { return ['bg', 'en']; }
    // urls
    public static get productsAndCategoriesUrl():string { return "http://e3d582ed.ngrok.io/api/productsAndCategories"; }
    public static get categoriesUrl():string { return "http://e3d582ed.ngrok.io/api/categories"; }
    public static get productsUrl():string { return "http://e3d582ed.ngrok.io/api/products"; }
    public static get messageUrl():string { return "http://e3d582ed.ngrok.io/api/message"; }
    public static get orderUrl():string { return "http://e3d582ed.ngrok.io/api/order"; }
    public static get adminLoginUrl():string { return "http://e3d582ed.ngrok.io/api/admin/login"; }

    // staging
    // public static get productsAndCategoriesUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/productsAndCategories"; }
    // public static get categoriesUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/categories"; }
    // public static get productsUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/products"; }
    // public static get messageUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/message"; }
    // public static get orderUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/order"; }
    // public static get adminLoginUrl():string { return "https://morning-oasis-39757.herokuapp.com/api/admin/login"; }


    public static get mapCoordinates():Object { return { lat: 42.711330, lng: 23.375995, zoom: 13 }; }
}
