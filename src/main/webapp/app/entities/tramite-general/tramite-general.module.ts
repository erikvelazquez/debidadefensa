import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    TramiteGeneralService,
    TramiteGeneralPopupService,
    TramiteGeneralComponent,
    TramiteGeneralDetailComponent,
    TramiteGeneralDialogComponent,
    TramiteGeneralPopupComponent,
    TramiteGeneralDeletePopupComponent,
    TramiteGeneralDeleteDialogComponent,
    tramiteGeneralRoute,
    tramiteGeneralPopupRoute,
    TramiteGeneralResolvePagingParams,
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
        TramiteGeneralComponent,
        TramiteGeneralDetailComponent,
        TramiteGeneralDialogComponent,
        TramiteGeneralDeleteDialogComponent,
        TramiteGeneralPopupComponent,
        TramiteGeneralDeletePopupComponent,
    ],
    entryComponents: [
        TramiteGeneralComponent,
        TramiteGeneralDialogComponent,
        TramiteGeneralPopupComponent,
        TramiteGeneralDeleteDialogComponent,
        TramiteGeneralDeletePopupComponent,
    ],
    providers: [
        TramiteGeneralService,
        TramiteGeneralPopupService,
        TramiteGeneralResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaTramiteGeneralModule {}
