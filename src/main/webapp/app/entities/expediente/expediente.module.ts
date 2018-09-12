import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaExpedienteModule {}
