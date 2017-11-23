import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FetcherService } from '../../services/fetcher.service';
import { Dictionary } from '../../dictionary/dictionary.service';
import { EventEmiterService } from '../../services/event.emiter.service';
import { ErrorHandlerService } from '../../services/error.handler.service';

@Component({
    selector: 'messages',
    styleUrls: ['./messages.component.css'],
    templateUrl: './messages.component.html'
})

export class MessagesComponent {

    public messages: Array<Object> = [];

    constructor(
        public router: Router,
        public dictionary: Dictionary,
        public authService: AuthService,
        public fetcherService: FetcherService,
        public eventEmiterService: EventEmiterService,
        public errorHandlerService: ErrorHandlerService
    ) {
      this.eventEmiterService.loggedIn.subscribe(data => this.loggedIn(data));
      // todo: remove it on prod
      this.loggedIn({});
    };    

    public loggedIn(data) {
      this.fetcherService.getMessages(this.authService.getLoginData()).subscribe(
          data => this.onFetchedMessages(data),
          err => this.errorHandlerService.handleError(err)
      );
    }
    
    public onFetchedMessages(data) {
      this.messages = data.json();
    }

    public removeMessage(response) {
      var message = response.response;
      for(var messageCounter = 0; messageCounter < this.messages.length; messageCounter++) {
        if(this.messages[messageCounter]['_id'] == message._id) {
          this.messages.splice(messageCounter, 1);
          break;
        }
      }
    }

    public deleteMessage(message) {
      let loginData = this.authService.getLoginData();
      let body = Object.assign(loginData, {'message': message});
      this.fetcherService.deleteMessage(body).subscribe(
          data => this.removeMessage(data.json()),
          err => this.errorHandlerService.handleError(err)
      );
    }
}
