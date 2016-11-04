// Angular 2 Modules
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Views
import { HomeComponent } from './components/home/home.component';
import { ProductListComponent } from './components/product_list/product_list.component';
import { DetailsComponent } from './components/details/details.component';
import { SearchComponent } from './components/search/search.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from './components/page_not_found/page_not_found.component';

const appRoutes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  }, { 
    path: 'products/:category', 
    component: ProductListComponent,
    data: {
      title: 'Product List'
    }
  }, { 
    path: 'details/:productLink', 
    component: DetailsComponent,
    data: {
      title: 'Details'
    }
  }, { 
    path: 'cart', 
    component: CartComponent,
    data: {
      title: 'Cart'
    }
  }, { 
    path: 'contacts', 
    component: ContactsComponent,
    data: {
      title: 'Contacts'
    }
  }, { 
    path: '**', 
    component: PageNotFoundComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);