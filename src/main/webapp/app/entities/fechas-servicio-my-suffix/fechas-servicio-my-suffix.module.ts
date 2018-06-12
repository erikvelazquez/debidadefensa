import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    FechasServicioMySuffixService,
    FechasServicioMySuffixPopupService,
    FechasServicioMySuffixComponent,
    FechasServicioMySuffixDetailComponent,
    FechasServicioMySuffixDialogComponent,
    FechasServicioMySuffixPopupComponent,
    FechasServicioMySuffixDeletePopupComponent,
    FechasServicioMySuffixDeleteDialogComponent,
    fechasServicioRoute,
    fechasServicioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...fechasServicioRoute,
    ...fechasServicioPopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        FechasServicioMySuffixComponent,
        FechasServicioMySuffixDetailComponent,
        FechasServicioMySuffixDialogComponent,
        FechasServicioMySuffixDeleteDialogComponent,
        FechasServicioMySuffixPopupComponent,
        FechasServicioMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        FechasServicioMySuffixComponent,
        FechasServicioMySuffixDialogComponent,
        FechasServicioMySuffixPopupComponent,
        FechasServicioMySuffixDeleteDialogComponent,
        FechasServicioMySuffixDeletePopupComponent,
    ],
    providers: [
        FechasServicioMySuffixService,
        FechasServicioMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaFechasServicioMySuffixModule {}
