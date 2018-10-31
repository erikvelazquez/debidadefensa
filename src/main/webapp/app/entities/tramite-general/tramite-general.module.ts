import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
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
import { registerLocaleData } from '@angular/common';
import localeEsMX from '@angular/common/locales/es-MX';

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
        { provide: LOCALE_ID, useValue: 'es-MX' }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaTramiteGeneralModule {}
