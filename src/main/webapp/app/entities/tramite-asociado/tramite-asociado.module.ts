import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    TramiteAsociadoService,
    TramiteAsociadoPopupService,
    TramiteAsociadoComponent,
    TramiteAsociadoDetailComponent,
    TramiteAsociadoDialogComponent,
    TramiteAsociadoPopupComponent,
    TramiteAsociadoDeletePopupComponent,
    TramiteAsociadoDeleteDialogComponent,
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
        TramiteAsociadoComponent,
        TramiteAsociadoDetailComponent,
        TramiteAsociadoDialogComponent,
        TramiteAsociadoDeleteDialogComponent,
        TramiteAsociadoPopupComponent,
        TramiteAsociadoDeletePopupComponent,
    ],
    entryComponents: [
        TramiteAsociadoComponent,
        TramiteAsociadoDialogComponent,
        TramiteAsociadoPopupComponent,
        TramiteAsociadoDeleteDialogComponent,
        TramiteAsociadoDeletePopupComponent,
    ],
    providers: [
        TramiteAsociadoService,
        TramiteAsociadoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaTramiteAsociadoModule {}
