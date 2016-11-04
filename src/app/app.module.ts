// Angular 2 Modules
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Ng2Webstorage } from 'ng2-webstorage';
import { AngularFireModule } from 'angularfire2';
import { ImageZoomModule } from 'angular2-image-zoom';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { BrowserModule }  from '@angular/platform-browser';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';
import { RecaptchaModule, RecaptchaLoaderService } from 'ng2-recaptcha';
import { FormsModule, ReactiveFormsModule, Validators }   from '@angular/forms';

// Router
import { routing, appRoutingProviders } from './app.routing';

// Language 
import { Language } from './language/language.service';
import { EnglishDictionary } from './language/en.dictionary';
import { BulgarianDictionary } from './language/bg.dictionary';

// Basic Components
import { FormComponent } from './basic_components/form/form.component';
import { PriceComponent } from './basic_components/price/price.component';
import { ImageComponent } from './basic_components/image/image.component';
import { ButtonComponent } from './basic_components/button/button.component';
import { HeaderComponent } from './basic_components/header/header.component';
import { ProductComponent } from './basic_components/product/product.component';
import { CarouselComponent } from './basic_components/carousel/carousel.component';
import { NotificationComponent } from './basic_components/notification/notification.component';

// Components
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { DetailsComponent } from './components/details/details.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SideMenuComponent } from './components/side_menu/side_menu.component';
import { ProductListComponent } from './components/product_list/product_list.component';
import { PageNotFoundComponent } from './components/page_not_found/page_not_found.component';
import { ZoomableImagesComponent } from './components/zoomable_images/zoomable_images.component';

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
        Ng2Webstorage,
        RecaptchaModule,
        ImageZoomModule,
        Ng2BootstrapModule,
        ReactiveFormsModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyDBbPzFEwNVTHNoZ-bz7YYqO1eMRPqTyUA'
        })
    ],
    // Components & Views
    declarations: [ 
        AppComponent,
        FormComponent,
        ImageComponent,
        PriceComponent,
        ButtonComponent,
        HeaderComponent,
        ProductComponent,
        CarouselComponent,
        ProductListComponent,
        NotificationComponent,
        ZoomableImagesComponent,
        // TableComponent,
        SideMenuComponent,
        HomeComponent,
        ContactsComponent,
        PageNotFoundComponent,
        CartComponent,
        SearchComponent,
        DetailsComponent
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
        RecaptchaLoaderService,
        // languages
        Language,
        EnglishDictionary,
        BulgarianDictionary,
        // services of the app
        FetcherService,
        CategoriesService,
        ProductsService,
        EventEmiterService,
        ErrorHandlerService
    ]
})

export class AppModule { }