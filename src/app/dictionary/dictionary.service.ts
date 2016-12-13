import { Injectable } from '@angular/core';
import { Config } from '../config';
import { EnglishDictionary } from './en.dictionary';
import { BulgarianDictionary } from './bg.dictionary';

@Injectable()
export class Dictionary {
    // the variables containing the language jsons
    // will contain the default language
    private language: string = ''; 
    // will return the texts from witch we fill our forms
    public getTexts(text) {
        return this[this.language].language[text];
    };

    public setLanguage(language) {
        this.language = language;
    }

    public nextLanguage() {
        var index = Config.defaultLang.indexOf(this.language);
        if(index == Config.languages.length - 1) {
            return Config.languages[0];
        } else {
            return Config.languages[index + 1];
        }
    }

    public changeLanguage() {
        this.language = this.nextLanguage();
    }

    constructor(private en: EnglishDictionary, private bg: BulgarianDictionary) {
        this.language = Config.defaultLang;
    };
}