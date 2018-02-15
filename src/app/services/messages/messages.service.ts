import { Injectable, EventEmitter } from '@angular/core';

import { MessageModel } from './message.model';

import { EventBusService } from '../../core/event-bus/event-bus.service';


@Injectable()

/**
 * @MessagesService used to contain the messages and work over them
 */
export class MessagesService {
    /**
    * @info: Contains all of the categories
    */
    private messagesArray: Array<MessageModel>;
    
    constructor(
        private eventBusService: EventBusService
    ) {
        // this.eventBusService.messagesUpdate.subscribe((eventData) => this.setMessages(eventData.messages));
    }

    /**
    * @getMessages get all messages
    * @return {Array} all categoties
    */
    public getMessages() {
        return this.messagesArray;
    }

    /**
    * @setMessages set all messages
    */
    public setMessages(messages: MessageModel[]) {
        this.messagesArray = messages;
        this.emitMessages();
    }

    /**
    * @removeMessage remove message from the messages
    */
    public removeMessage(response) {
        let message = response.response;
        for(let messageCounter = 0; messageCounter < this.messagesArray.length; messageCounter++) {
            if(this.messagesArray[messageCounter]['id'] == message.id) {
                this.messagesArray.splice(messageCounter, 1);
                break;
            }
        }
        this.emitMessages();
    }

    /**
    * @emitMessages emit the messages to the components
    */
    public emitMessages() {
        this.eventBusService.emitMessagesUpdate({
            messages: this.messagesArray
        });
    }

}
