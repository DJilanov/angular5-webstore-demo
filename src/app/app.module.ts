// Angular 2 Modules
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, Validators }   from '@angular/forms';
// import { RecaptchaModule, RecaptchaLoaderService } from 'ng2-recaptcha';

// Router
import { routing, appRoutingProviders } from './app.routing';

// Language 
import { Dictionary } from './dictionary/dictionary.service';
import { EnglishDictionary } from './dictionary/en.dictionary';
import { BulgarianDictionary } from './dictionary/bg.dictionary';

// Admin
import { AppComponent } from './app.component';
import { NgDragDropModule } from 'ng-drag-drop';

import { LoginComponent } from './components/login/login.component';
import { FormComponent } from './components/form/form.component';
import { ImageComponent } from './components/image/image.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ProductModalComponent } from './components/product-modal/product_modal.component';

import { AuthService } from './services/auth.service';

// Config
import { Config } from './config';

// Services
import { FetcherService } from './services/fetcher.service';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { EventEmiterService } from './services/event.emiter.service';
import { ErrorHandlerService } from './services/error.handler.service';

@NgModule({
    // Modules & Libs
    imports: [
        routing,
        HttpModule,
        FormsModule,
        BrowserModule,
        // RecaptchaModule,
        ReactiveFormsModule,
        NgDragDropModule.forRoot()
    ],
    // Components & Views
    declarations: [ 
        AppComponent,
        FormComponent,
        ImageComponent,
        LoginComponent,
        HomeComponent,
        MessagesComponent,
        ProductsComponent,
        CategoriesComponent,
        NavigationComponent,
        ProductModalComponent,
    ],
    // Bootstraping
    bootstrap: [ 
        AppComponent 
    ],
    // Services
    providers: [
        // config of the app
        Config,
        // router of the app
        appRoutingProviders,
        // languages
        Dictionary,
        EnglishDictionary,
        BulgarianDictionary,
        FetcherService,
        CategoriesService,
        ProductsService,
        EventEmiterService,
        ErrorHandlerService,
        AuthService,
        // recaptcha
        // RecaptchaLoaderService
    ]
})

export class AppModule { }