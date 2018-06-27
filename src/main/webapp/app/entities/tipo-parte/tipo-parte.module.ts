import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    TipoParteService,
    TipoPartePopupService,
    TipoParteComponent,
    TipoParteDetailComponent,
    TipoParteDialogComponent,
    TipoPartePopupComponent,
    TipoParteDeletePopupComponent,
    TipoParteDeleteDialogComponent,
    tipoParteRoute,
    tipoPartePopupRoute,
} from './';

const ENTITY_STATES = [
    ...tipoParteRoute,
    ...tipoPartePopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TipoParteComponent,
        TipoParteDetailComponent,
        TipoParteDialogComponent,
        TipoParteDeleteDialogComponent,
        TipoPartePopupComponent,
        TipoParteDeletePopupComponent,
    ],
    entryComponents: [
        TipoParteComponent,
        TipoParteDialogComponent,
        TipoPartePopupComponent,
        TipoParteDeleteDialogComponent,
        TipoParteDeletePopupComponent,
    ],
    providers: [
        TipoParteService,
        TipoPartePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaTipoParteModule {}
