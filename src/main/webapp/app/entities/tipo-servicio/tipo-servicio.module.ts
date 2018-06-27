import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    TipoServicioService,
    TipoServicioPopupService,
    TipoServicioComponent,
    TipoServicioDetailComponent,
    TipoServicioDialogComponent,
    TipoServicioPopupComponent,
    TipoServicioDeletePopupComponent,
    TipoServicioDeleteDialogComponent,
    tipoServicioRoute,
    tipoServicioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipoServicioRoute,
    ...tipoServicioPopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipoServicioComponent,
        TipoServicioDetailComponent,
        TipoServicioDialogComponent,
        TipoServicioDeleteDialogComponent,
        TipoServicioPopupComponent,
        TipoServicioDeletePopupComponent,
    ],
    entryComponents: [
        TipoServicioComponent,
        TipoServicioDialogComponent,
        TipoServicioPopupComponent,
        TipoServicioDeleteDialogComponent,
        TipoServicioDeletePopupComponent,
    ],
    providers: [
        TipoServicioService,
        TipoServicioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaTipoServicioModule {}
