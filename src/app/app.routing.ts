// Angular 2 Modules
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Standard Views
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { DetailsComponent } from './components/details/details.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ProductListComponent } from './components/product_list/product_list.component';
import { PageNotFoundComponent } from './components/page_not_found/page_not_found.component';

// Admin Views
import { AdminComponent } from './admin/components/admin/admin.component';

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
    path: 'admin', 
    component: AdminComponent,
    data: {
      title: 'Admin'
    }
  }, { 
    path: 'admin/navigation', 
    component: AdminComponent,
    data: {
      title: 'Navigation'
    }
  }, { 
    path: 'admin/products', 
    component: AdminComponent,
    data: {
      title: 'Products'
    }
  }, { 
    path: 'admin/categories', 
    component: AdminComponent,
    data: {
      title: 'Categories'
    }
  }, { 
    path: 'admin/messages', 
    component: AdminComponent,
    data: {
      title: 'Messages'
    }
  }, { 
    path: 'admin/orders', 
    component: AdminComponent,
    data: {
      title: 'Orders'
    }
  }, { 
    path: '**', 
    component: PageNotFoundComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);