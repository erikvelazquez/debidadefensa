import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    TramiteGeneralMySuffixService,
    TramiteGeneralMySuffixPopupService,
    TramiteGeneralMySuffixComponent,
    TramiteGeneralMySuffixDetailComponent,
    TramiteGeneralMySuffixDialogComponent,
    TramiteGeneralMySuffixPopupComponent,
    TramiteGeneralMySuffixDeletePopupComponent,
    TramiteGeneralMySuffixDeleteDialogComponent,
    tramiteGeneralRoute,
    tramiteGeneralPopupRoute,
    TramiteGeneralMySuffixResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...tramiteGeneralRoute,
    ...tramiteGeneralPopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TramiteGeneralMySuffixComponent,
        TramiteGeneralMySuffixDetailComponent,
        TramiteGeneralMySuffixDialogComponent,
        TramiteGeneralMySuffixDeleteDialogComponent,
        TramiteGeneralMySuffixPopupComponent,
        TramiteGeneralMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TramiteGeneralMySuffixComponent,
        TramiteGeneralMySuffixDialogComponent,
        TramiteGeneralMySuffixPopupComponent,
        TramiteGeneralMySuffixDeleteDialogComponent,
        TramiteGeneralMySuffixDeletePopupComponent,
    ],
    providers: [
        TramiteGeneralMySuffixService,
        TramiteGeneralMySuffixPopupService,
        TramiteGeneralMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaTramiteGeneralMySuffixModule {}
