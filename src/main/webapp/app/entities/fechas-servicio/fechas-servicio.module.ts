import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    FechasServicioService,
    FechasServicioPopupService,
    FechasServicioComponent,
    FechasServicioDetailComponent,
    FechasServicioDialogComponent,
    FechasServicioPopupComponent,
    FechasServicioDeletePopupComponent,
    FechasServicioDeleteDialogComponent,
    fechasServicioRoute,
    fechasServicioPopupRoute,
} from './';
import { AgendaComponent } from './agenda.component';

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
        AgendaComponent,
        FechasServicioComponent,
        FechasServicioDetailComponent,
        FechasServicioDialogComponent,
        FechasServicioDeleteDialogComponent,
        FechasServicioPopupComponent,
        FechasServicioDeletePopupComponent,
    ],
    entryComponents: [
        FechasServicioComponent,
        FechasServicioDialogComponent,
        FechasServicioPopupComponent,
        FechasServicioDeleteDialogComponent,
        FechasServicioDeletePopupComponent,
    ],
    providers: [
        FechasServicioService,
        FechasServicioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaFechasServicioModule {}
