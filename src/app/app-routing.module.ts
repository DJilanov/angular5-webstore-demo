import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ServerErrorPageComponent } from './feedback/server-error-page/server-error-page.component';

const routes: Routes = [
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
    component: CategoryComponent,
    data: {
      meta: {
        description: 'Изберете от десетките видове RAM памети, хард дискове и компютърни части на промоционалните ни цени!'
      }
    }
  }, { 
    path: 'details/:productLink', 
    component: ProductDetailsComponent,
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
    component: ContactComponent,
    data: {
      meta: {
        title: 'Връзка с Жиланов ЕООД',
        description: 'Можете да се свържете с нас на телефон 0878466180 или чрез контактната форма'
      }
    }
  }, { 
    path: '**', 
    component: ServerErrorPageComponent
  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule { }