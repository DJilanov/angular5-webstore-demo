import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ServerErrorPageComponent } from './feedback/server-error-page/server-error-page.component';

const routes: Routes = [
    { 
        path: '', 
        loadChildren: 'app/modules/home/home.module#HomeModule',
        data: {
            meta: {
                title: 'Компютърни компоненти Жиланов: евтини РАМ(RAM) памети, видеонаблюдение, твърд диск и видеокарти',
                description: 'Изберете от десетките видове RAM памети, хард дискове и компютърни части на промоционалните ни цени!'
            }
        }
    },
    { 
        path: 'categories/:category', 
        loadChildren: './modules/categories/categories.module#CategoriesModule',
        data: {
            meta: {
                title: 'Компютърни компоненти Жиланов: евтини РАМ(RAM) памети, видеонаблюдение, твърд диск и видеокарти',
                description: 'Изберете от десетките видове RAM памети, хард дискове и компютърни части на промоционалните ни цени!'
            }
        }
    },
    { 
        path: 'categories/:category/:product', 
        loadChildren: './modules/product-details/product-details.module#ProductDetailsModule',
        data: {
            meta: {
                title: 'Компютърни компоненти Жиланов: евтини РАМ(RAM) памети, видеонаблюдение, твърд диск и видеокарти',
                description: 'Изберете от десетките видове RAM памети, хард дискове и компютърни части на промоционалните ни цени!'
            }
        }
    },
    { 
        path: 'cart', 
        loadChildren: './modules/cart/cart.module#CartModule',
        data: {
            meta: {
                title: 'Количка с поръчки от Жиланов ЕООД',
                description: 'Не изпускайте момента да подобрите компютъра си на промоционалните ни цени!'
            }
        }
    },
    { 
        path: 'order/:orderPage', 
        loadChildren: './modules/order/order.module#OrderModule',
        data: {
            meta: {
                title: 'Вашите поръчки от Жиланов ЕООД',
                description: 'Благодарим ви, че пазарувахте от нас!'
            }
        }
    },
    { 
        path: 'contacts', 
        loadChildren: './modules/contact/contact.module#ContactModule',
        data: {
            meta: {
                title: 'Връзка с Жиланов ЕООД',
                description: 'Можете да се свържете с нас на телефон 0878466180 или чрез контактната форма'
            }
        }
    },
    {
        path: 'error-page',
        component: ServerErrorPageComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes, 
            { 
                useHash: false, 
                preloadingStrategy: PreloadAllModules 
            }
        )
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule { }