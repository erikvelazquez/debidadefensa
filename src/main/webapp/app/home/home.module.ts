import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../shared';

import { BrowserModule } from '@angular/platform-browser';

import { HOME_ROUTE, HomeComponent } from './';

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        BrowserModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaHomeModule {}
