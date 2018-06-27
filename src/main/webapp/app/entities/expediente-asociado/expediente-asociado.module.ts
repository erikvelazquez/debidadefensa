import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    ExpedienteAsociadoService,
    ExpedienteAsociadoPopupService,
    ExpedienteAsociadoComponent,
    ExpedienteAsociadoDetailComponent,
    ExpedienteAsociadoDialogComponent,
    ExpedienteAsociadoPopupComponent,
    ExpedienteAsociadoDeletePopupComponent,
    ExpedienteAsociadoDeleteDialogComponent,
    expedienteAsociadoRoute,
    expedienteAsociadoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...expedienteAsociadoRoute,
    ...expedienteAsociadoPopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExpedienteAsociadoComponent,
        ExpedienteAsociadoDetailComponent,
        ExpedienteAsociadoDialogComponent,
        ExpedienteAsociadoDeleteDialogComponent,
        ExpedienteAsociadoPopupComponent,
        ExpedienteAsociadoDeletePopupComponent,
    ],
    entryComponents: [
        ExpedienteAsociadoComponent,
        ExpedienteAsociadoDialogComponent,
        ExpedienteAsociadoPopupComponent,
        ExpedienteAsociadoDeleteDialogComponent,
        ExpedienteAsociadoDeletePopupComponent,
    ],
    providers: [
        ExpedienteAsociadoService,
        ExpedienteAsociadoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaExpedienteAsociadoModule {}
