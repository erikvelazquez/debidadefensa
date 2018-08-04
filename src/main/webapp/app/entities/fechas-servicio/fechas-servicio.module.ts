import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import 'flatpickr/dist/flatpickr.css';
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
import { AgendaComponent, AgendaPopupComponent } from './agenda.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

const ENTITY_STATES = [
    ...fechasServicioRoute,
    ...fechasServicioPopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        BrowserAnimationsModule, CalendarModule.forRoot()
    ],
    declarations: [        
        FechasServicioComponent,
        FechasServicioDetailComponent,
        FechasServicioDialogComponent,
        FechasServicioDeleteDialogComponent,
        AgendaComponent,
        FechasServicioPopupComponent,
        FechasServicioDeletePopupComponent,
        AgendaPopupComponent,
    ],
    entryComponents: [
        FechasServicioComponent,
        FechasServicioDialogComponent,
        FechasServicioPopupComponent,
        FechasServicioDeleteDialogComponent,
        AgendaComponent,
        FechasServicioDeletePopupComponent,
        AgendaPopupComponent,
    ],
    providers: [
        FechasServicioService,
        FechasServicioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaFechasServicioModule {}
