import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    TramiteAsociadoMySuffixService,
    TramiteAsociadoMySuffixPopupService,
    TramiteAsociadoMySuffixComponent,
    TramiteAsociadoMySuffixDetailComponent,
    TramiteAsociadoMySuffixDialogComponent,
    TramiteAsociadoMySuffixPopupComponent,
    TramiteAsociadoMySuffixDeletePopupComponent,
    TramiteAsociadoMySuffixDeleteDialogComponent,
    tramiteAsociadoRoute,
    tramiteAsociadoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tramiteAsociadoRoute,
    ...tramiteAsociadoPopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TramiteAsociadoMySuffixComponent,
        TramiteAsociadoMySuffixDetailComponent,
        TramiteAsociadoMySuffixDialogComponent,
        TramiteAsociadoMySuffixDeleteDialogComponent,
        TramiteAsociadoMySuffixPopupComponent,
        TramiteAsociadoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TramiteAsociadoMySuffixComponent,
        TramiteAsociadoMySuffixDialogComponent,
        TramiteAsociadoMySuffixPopupComponent,
        TramiteAsociadoMySuffixDeleteDialogComponent,
        TramiteAsociadoMySuffixDeletePopupComponent,
    ],
    providers: [
        TramiteAsociadoMySuffixService,
        TramiteAsociadoMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaTramiteAsociadoMySuffixModule {}
