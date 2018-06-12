import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    ExpedienteAsociadoMySuffixService,
    ExpedienteAsociadoMySuffixPopupService,
    ExpedienteAsociadoMySuffixComponent,
    ExpedienteAsociadoMySuffixDetailComponent,
    ExpedienteAsociadoMySuffixDialogComponent,
    ExpedienteAsociadoMySuffixPopupComponent,
    ExpedienteAsociadoMySuffixDeletePopupComponent,
    ExpedienteAsociadoMySuffixDeleteDialogComponent,
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
        ExpedienteAsociadoMySuffixComponent,
        ExpedienteAsociadoMySuffixDetailComponent,
        ExpedienteAsociadoMySuffixDialogComponent,
        ExpedienteAsociadoMySuffixDeleteDialogComponent,
        ExpedienteAsociadoMySuffixPopupComponent,
        ExpedienteAsociadoMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ExpedienteAsociadoMySuffixComponent,
        ExpedienteAsociadoMySuffixDialogComponent,
        ExpedienteAsociadoMySuffixPopupComponent,
        ExpedienteAsociadoMySuffixDeleteDialogComponent,
        ExpedienteAsociadoMySuffixDeletePopupComponent,
    ],
    providers: [
        ExpedienteAsociadoMySuffixService,
        ExpedienteAsociadoMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaExpedienteAsociadoMySuffixModule {}
