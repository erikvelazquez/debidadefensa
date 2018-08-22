import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { DebidadefensaSharedModule } from '../../shared';
import {
    PagosService,
    PagosPopupService,
    PagosComponent,
    PagosDetailComponent,
    PagosDialogComponent,
    PagosPopupComponent,
    PagosDeletePopupComponent,
    PagosDeleteDialogComponent,
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
        RouterModule.forChild(ENTITY_STATES),
        CurrencyMaskModule
    ],
    declarations: [
        PagosComponent,
        PagosDetailComponent,
        PagosDialogComponent,
        PagosDeleteDialogComponent,
        PagosPopupComponent,
        PagosDeletePopupComponent,
    ],
    entryComponents: [
        PagosComponent,
        PagosDialogComponent,
        PagosPopupComponent,
        PagosDeleteDialogComponent,
        PagosDeletePopupComponent,
    ],
    providers: [
        PagosService,
        PagosPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaPagosModule {}
