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

const appRoutes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    data: {
      meta: {
        title: 'Компютърни компоненти Жиланов: евтини РАМ(RAM) памети, видеонаблюдение, твърд диск и видеокарти',
        description: 'Изберете от десетките видове RAM памети, хард дискове и компютърни части на промоционалните ни цени!'
      }
    }
  }, { 
    path: 'products/:category', 
    component: ProductListComponent,
    data: {
      meta: {
        description: 'Изберете от десетките видове RAM памети, хард дискове и компютърни части на промоционалните ни цени!'
      }
    }
  }, { 
    path: 'details/:productLink', 
    component: DetailsComponent,
    data: {
      meta: {
        description: 'Изберете от десетките видове RAM памети, хард дискове и компютърни части на промоционалните ни цени!'
      }
    }
  }, { 
    path: 'cart', 
    component: CartComponent,
    data: {
      meta: {
        title: 'Количка с поръчки от Жиланов ЕООД',
        description: 'Не изпускайте момента да подобрите компютъра си на промоционалните ни цени!'
      }
    }
  }, { 
    path: 'contacts', 
    component: ContactsComponent,
    data: {
      meta: {
        title: 'Връзка с Жиланов ЕООД',
        description: 'Можете да се свържете с нас на телефон 0878466180 или чрез контактната форма'
      }
    }
  }, { 
    path: '**', 
    component: PageNotFoundComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);