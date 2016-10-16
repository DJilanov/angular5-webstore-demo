import { Injectable } from '@angular/core';

@Injectable()
// Will contain all of the urls and constants of the app
export class Config {
    // language
    public static get defaultLang():string { return "bg"; }
    // urls
    public static get categoriesUrl():string { return "localhost:8080"; }
    public static get productsUrl():string { return "localhost:8080"; }
}
