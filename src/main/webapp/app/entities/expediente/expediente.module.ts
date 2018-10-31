import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomDatepickerI18n } from '../../services/fecha.service';
import { DebidadefensaSharedModule } from '../../shared';
import {
    ExpedienteService,
    ExpedientePopupService,
    ExpedienteComponent,
    ExpedienteDetailComponent,
    ExpedienteDialogComponent,
    ExpedientePopupComponent,
    ExpedienteDeletePopupComponent,
    ExpedienteDeleteDialogComponent,
    expedienteRoute,
    expedientePopupRoute,
} from './';
import { registerLocaleData } from '@angular/common';
import localeEsMX from '@angular/common/locales/es-MX';

const ENTITY_STATES = [
    ...expedienteRoute,
    ...expedientePopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExpedienteComponent,
        ExpedienteDetailComponent,
        ExpedienteDialogComponent,
        ExpedienteDeleteDialogComponent,
        ExpedientePopupComponent,
        ExpedienteDeletePopupComponent,
    ],
    entryComponents: [
        ExpedienteComponent,
        ExpedienteDialogComponent,
        ExpedientePopupComponent,
        ExpedienteDeleteDialogComponent,
        ExpedienteDeletePopupComponent,
    ],
    providers: [
        ExpedienteService,
        ExpedientePopupService,
        CustomDatepickerI18n,
        { provide: LOCALE_ID, useValue: 'es-MX' }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaExpedienteModule {}
