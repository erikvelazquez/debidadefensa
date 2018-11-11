import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomDatepickerI18n } from '../../services/fecha.service';
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
        CustomDatepickerI18n,
        { provide: LOCALE_ID, useValue: 'es-MX' }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaExpedienteAsociadoModule {}
