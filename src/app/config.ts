import { Injectable } from '@angular/core';

@Injectable()
// Will contain all of the urls and constants of the app
export class Config {
    // language
    public static get defaultLang():string { return "bg"; }
    // urls
    public static get categoriesUrl():string { return "http://c57e77b7.ngrok.io/api/categories"; }
    public static get productsUrl():string { return "http://c57e77b7.ngrok.io/api/products"; }
    public static get mapCoordinates():Object { return { lat: 42.711330, lng: 23.375995, zoom: 13 }; }
}
