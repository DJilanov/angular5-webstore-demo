// Angular 2 Modules
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Admin Views
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NavigationComponent } from './components/navigation/navigation.component';

const appRoutes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  }, { 
    path: 'home', 
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  }, { 
    path: 'navigation', 
    component: NavigationComponent,
    data: {
      title: 'Navigation'
    }
  }, { 
    path: 'products', 
    component: ProductsComponent,
    data: {
      title: 'Products'
    }
  }, { 
    path: 'categories', 
    component: CategoriesComponent,
    data: {
      title: 'Categories'
    }
  }, { 
    path: 'messages', 
    component: MessagesComponent,
    data: {
      title: 'Messages'
    }
  }, {
    path: '**', 
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);