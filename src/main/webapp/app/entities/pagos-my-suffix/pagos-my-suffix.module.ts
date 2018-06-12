import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    PagosMySuffixService,
    PagosMySuffixPopupService,
    PagosMySuffixComponent,
    PagosMySuffixDetailComponent,
    PagosMySuffixDialogComponent,
    PagosMySuffixPopupComponent,
    PagosMySuffixDeletePopupComponent,
    PagosMySuffixDeleteDialogComponent,
    pagosRoute,
    pagosPopupRoute,
} from './';

const ENTITY_STATES = [
    ...pagosRoute,
    ...pagosPopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PagosMySuffixComponent,
        PagosMySuffixDetailComponent,
        PagosMySuffixDialogComponent,
        PagosMySuffixDeleteDialogComponent,
        PagosMySuffixPopupComponent,
        PagosMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        PagosMySuffixComponent,
        PagosMySuffixDialogComponent,
        PagosMySuffixPopupComponent,
        PagosMySuffixDeleteDialogComponent,
        PagosMySuffixDeletePopupComponent,
    ],
    providers: [
        PagosMySuffixService,
        PagosMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaPagosMySuffixModule {}
