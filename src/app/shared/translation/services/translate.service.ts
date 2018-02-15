import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs/Subject';

import { EventBusService } from '../../../core/event-bus/event-bus.service';

declare function require(url: string);

const defaultLanguage = 'en';
const english = require('../languages/lang-en.json');
const bulgarian = require('../languages/lang-bg.json');

@Injectable()
export class TranslateService {
    private language: string;

    constructor(
        private eventBusService: EventBusService
    ) {
        this.language = defaultLanguage
    }
    
    public getLanguage() {
        return this.language;
    }

    public changeLanguage(eventData) {
        this.language = eventData.language || defaultLanguage;
    }

    public translate(text) {
        switch (this.language) {
            case 'en':
                text = english[text] || text;
                break;
            case 'bg':
                text = bulgarian[text] || text;
                break;
            default:
                text = english[text] || text;
                break;
        }

        return text;
    }
}