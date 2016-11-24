import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FetcherService } from '../../../services/fetcher.service';
import { Dictionary } from '../../../dictionary/dictionary.service';
import { EventEmiterService } from '../../../services/event.emiter.service';
import { ErrorHandlerService } from '../../../services/error.handler.service';

@Component({
    selector: 'admin-messages',
    styleUrls: ['./admin_messages.component.css'],
    templateUrl: './admin_messages.component.html'
})

export class AdminMessagesComponent {

    private messages: Array<Object> = [];

    constructor(
        private router: Router,
        private dictionary: Dictionary,
        private authService: AuthService,
        private fetcherService: FetcherService,
        private eventEmiterService: EventEmiterService,
        private errorHandlerService: ErrorHandlerService
    ) {
      this.eventEmiterService.loggedIn.subscribe(data => this.loggedIn(data));
      // todo: remove it on prod
      this.loggedIn({});
    };    

    private loggedIn(data) {
      this.fetcherService.getMessages(this.authService.getLoginData()).subscribe(
          data => this.onFetchedMessages(data),
          err => this.errorHandlerService.handleError(err)
      );
    }
    
    private onFetchedMessages(data) {
      this.messages = data.json();
    }

    private deleteMessage(message) {

    }
}
