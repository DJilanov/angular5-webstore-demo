import { NgModule, Optional, SkipSelf } from '@angular/core';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { ServerErrorPageComponent } from './server-error-page/server-error-page.component';
import { CommonModule } from '@angular/common';

import { throwIfAlreadyLoaded } from '../core/module-import-guard';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ErrorMessageComponent,
        ServerErrorPageComponent
    ],
    declarations: [
        ErrorMessageComponent,
        ServerErrorPageComponent
    ]
})
export class FeedbackModule {
	constructor( @Optional() @SkipSelf() parentModule: CommonModule) {
		throwIfAlreadyLoaded(parentModule, 'FeedbackModule');
	}
}