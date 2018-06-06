import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerErrorPageComponent } from './feedback/server-error-page/server-error-page.component';

const routes: Routes = [
    { 
        path: '', 
        loadChildren: 'app/modules/home/home.module#HomeModule',
        data: {
            preload: true,
            meta: {
                title: 'Компютърни компоненти Жиланов: евтини РАМ(RAM) памети, видеонаблюдение, твърд диск и видеокарти',
                description: 'Изберете от десетките видове RAM памети, хард дискове и компютърни части на промоционалните ни цени!'
            }
        }
    },
    { 
        path: 'categories', 
        loadChildren: './modules/categories/categories.module',
        data: {
            preload: true,
            meta: {
                title: 'Компютърни компоненти Жиланов: евтини РАМ(RAM) памети, видеонаблюдение, твърд диск и видеокарти',
                description: 'Изберете от десетките видове RAM памети, хард дискове и компютърни части на промоционалните ни цени!'
            }
        }
    },
    { 
        path: 'cart', 
        loadChildren: './modules/cart/cart.module',
        data: {
            preload: true,
            meta: {
                title: 'Количка с поръчки от Жиланов ЕООД',
                description: 'Не изпускайте момента да подобрите компютъра си на промоционалните ни цени!'
            }
        }
    },
    { 
        path: 'contacts', 
        loadChildren: './modules/contact/contact.module#ContactModule',
        data: {
            preload: true,
            meta: {
                title: 'Връзка с Жиланов ЕООД',
                description: 'Можете да се свържете с нас на телефон 0878466180 или чрез контактната форма'
            }
        }
    },
    {
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