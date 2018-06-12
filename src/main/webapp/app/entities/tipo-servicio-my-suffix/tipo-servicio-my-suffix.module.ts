import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    TipoServicioMySuffixService,
    TipoServicioMySuffixPopupService,
    TipoServicioMySuffixComponent,
    TipoServicioMySuffixDetailComponent,
    TipoServicioMySuffixDialogComponent,
    TipoServicioMySuffixPopupComponent,
    TipoServicioMySuffixDeletePopupComponent,
    TipoServicioMySuffixDeleteDialogComponent,
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
        TipoServicioMySuffixComponent,
        TipoServicioMySuffixDetailComponent,
        TipoServicioMySuffixDialogComponent,
        TipoServicioMySuffixDeleteDialogComponent,
        TipoServicioMySuffixPopupComponent,
        TipoServicioMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TipoServicioMySuffixComponent,
        TipoServicioMySuffixDialogComponent,
        TipoServicioMySuffixPopupComponent,
        TipoServicioMySuffixDeleteDialogComponent,
        TipoServicioMySuffixDeletePopupComponent,
    ],
    providers: [
        TipoServicioMySuffixService,
        TipoServicioMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaTipoServicioMySuffixModule {}
