import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Config } from '../config';
import { SessionService } from '../services/session.service';

@Injectable()

/**
 * @DriverService used on all connections to the back-end for the drivers
 */
export class DriverService {
    static instance: DriverService;

    /**
    * @postHeaders {Headers} 
    * @postRequestOptions {RequestOptions}
    * @getRequestOptions {RequestOptions}
    */
    private postHeaders: Headers = new Headers;
    private getHeaders: Headers = new Headers;
    private postRequestOptions: RequestOptions = new RequestOptions;
    private getRequestOptions: RequestOptions = new RequestOptions;

    /**
    * @getDrivers get all the drivers
    * @return {Array} all drivers
    */
    public getDrivers() {
        return this.http.get( Config.users, this.getRequestOptions ).map( res => res.json() );
    }

    /**
    * @getOrderById get all single order data
    * @return {Object} single order data
    */
    public getOrderById(id: number) {
        return this.http.get( Config.users, this.getRequestOptions ).map( res => res.json() );
    }

    constructor( private http: Http, private sessionService: SessionService ) {
        
        // Set post headers what to expect and what to send
        this.postHeaders.append('Accept', 'application/json');
        this.getHeaders.append('Accept', 'application/json');

        this.postHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        this.postHeaders.append('Authorization', 'Bearer ' + this.sessionService.getAccessToken());
        this.getHeaders.append('Authorization', 'Bearer ' + this.sessionService.getAccessToken());

        // Set post request options headers
        this.postRequestOptions.headers = this.postHeaders;
        this.getRequestOptions.headers = this.getHeaders;

        return DriverService.instance = DriverService.instance || this;
    }
}
