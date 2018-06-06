import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories.component';

import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: CategoriesComponent,
        children: [
            {
                path: '**',
                children: [
                    {
                        path: '/:productTitle/',
                        loadChildren: 'app/modules/product-details/product-details.module#ProductDetailsModule',
                    }
                ]
            }
        ]
    }

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        SharedModule
    ],
    exports: [

    ],
    declarations: [
        CategoriesComponent
    ]
})
export class CategoriesModule { }
