// Angular 2 Modules
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2BootstrapModule } from 'ng2-bootstrap/ng2-bootstrap';

// Router
import { routing, appRoutingProviders } from './app.routing';

// Language 
import { Language } from './language/language.service';
import { EnglishDictionary } from './language/en.dictionary';
import { BulgarianDictionary } from './language/bg.dictionary';

// Basic Components
import { ImageComponent } from './basic_components/image/image.component';
import { ButtonComponent } from './basic_components/button/button.component';
import { HeaderComponent } from './basic_components/header/header.component';
import { SearchComponent } from './basic_components/search/search.component';
import { ProductComponent } from './basic_components/product/product.component';
import { CarouselComponent } from './basic_components/carousel/carousel.component';
import { NotificationComponent } from './basic_components/notification/notification.component';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SideMenuComponent } from './components/side_menu/side_menu.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { PageNotFoundComponent } from './components/page_not_found/page_not_found.component';
import { ProductListComponent } from './components/product_list/product_list.component';
import { CartComponent } from './components/cart/cart.component';
import { DetailsComponent } from './components/details/details.component';

// Config
import { Config } from './config';

// Services
import { FetcherService } from './services/fetcher.service';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';

export const firebaseConfig = {
    apiKey: "AIzaSyDUHZkBVC5g1x3wzs6YPE8Mpf3jif-vu1w",
    authDomain: "neon-victory-130213.firebaseapp.com",
    databaseURL: "https://neon-victory-130213.firebaseio.com",
    storageBucket: "neon-victory-130213.appspot.com",
    messagingSenderId: "835631843033"
};

@NgModule({
    // Modules & Libs
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        Ng2BootstrapModule
    ],
    // Components & Views
    declarations: [ 
        AppComponent,
        ImageComponent,
        ButtonComponent,
        HeaderComponent,
        SearchComponent,
        ProductComponent,
        CarouselComponent,
        ProductListComponent,
        NotificationComponent,
        // TableComponent,
        SideMenuComponent,
        HomeComponent,
        ContactsComponent,
        PageNotFoundComponent,
        CartComponent,
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
        // languages
        Language,
        EnglishDictionary,
        BulgarianDictionary,
        // services of the app
        FetcherService,
        CategoriesService,
        ProductsService
    ]
})

export class AppModule { }