import { Injectable } from '@angular/core';
import { Config } from '../config';
import { EnglishDictionary } from './en.dictionary.ts';
import { BulgarianDictionary } from './bg.dictionary.ts';

@Injectable()
export class Language {
    // the variables containing the language jsons
    // will contain the default language
    private language = new String; 
    // will return the texts from witch we fill our forms
    public getTexts = function(text) {
        return this[this.language].language[text];
    };

    public setLanguage = function(language) {
        this.language = language;
    }

    constructor(private en: EnglishDictionary, private bg: BulgarianDictionary) {
        this.language = Config.defaultLang;
    };
}