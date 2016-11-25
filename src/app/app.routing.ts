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
import { AdminMessagesComponent } from './admin/components/admin-messages/admin_messages.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin_products.component';
import { AdminCategoriesComponent } from './admin/components/admin-categories/admin_categories.component';
import { AdminNavigationComponent } from './admin/components/admin-navigation/admin_navigation.component';

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
    component: AdminNavigationComponent,
    data: {
      title: 'Navigation'
    }
  }, { 
    path: 'admin/products', 
    component: AdminProductsComponent,
    data: {
      title: 'Products'
    }
  }, { 
    path: 'admin/categories', 
    component: AdminCategoriesComponent,
    data: {
      title: 'Categories'
    }
  }, { 
    path: 'admin/messages', 
    component: AdminMessagesComponent,
    data: {
      title: 'Messages'
    }
  }, { 
    // TODO
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