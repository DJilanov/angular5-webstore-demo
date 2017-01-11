// import {
//   inject,
//   TestBed,
//   ComponentFixture
// } from "@angular/core/testing";

// // Load the implementations that should be tested
// import { CachingService } from "../src/app/services/caching.service";
// import { EventEmiterService } from '../src/app/services/event.emiter.service';
// import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';
// // user model we test
// let user = {
//     id: "id",
//     lastName: "lastName",
//     firstName: "firstName",
//     dateOfBirth: "2016-11-03",
//     emailAddress: "email"
// };
// // the user list we test
// let userList = [user];
// // the parameters we send to the function
// let parameters = {
//   user: user
// };
// let service: CachingService;
// let fixture: ComponentFixture<CachingService>;

// describe('CachingService', () => {
//   let service: CachingService;

//   beforeEach(() => { 
//     service = new CachingService(
//       new EventEmiterService(), 
//       new LocalStorageService(LOCAL_STORAGE_SERVICE_CONFIG)
//     ) 
//   });

//   it('#getUserList on empty must return undefined', () => {
//     expect(service.getUsersList()).toBe(null);
//   });

// });