import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    TipoParteMySuffixService,
    TipoParteMySuffixPopupService,
    TipoParteMySuffixComponent,
    TipoParteMySuffixDetailComponent,
    TipoParteMySuffixDialogComponent,
    TipoParteMySuffixPopupComponent,
    TipoParteMySuffixDeletePopupComponent,
    TipoParteMySuffixDeleteDialogComponent,
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
        TipoParteMySuffixComponent,
        TipoParteMySuffixDetailComponent,
        TipoParteMySuffixDialogComponent,
        TipoParteMySuffixDeleteDialogComponent,
        TipoParteMySuffixPopupComponent,
        TipoParteMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TipoParteMySuffixComponent,
        TipoParteMySuffixDialogComponent,
        TipoParteMySuffixPopupComponent,
        TipoParteMySuffixDeleteDialogComponent,
        TipoParteMySuffixDeletePopupComponent,
    ],
    providers: [
        TipoParteMySuffixService,
        TipoParteMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaTipoParteMySuffixModule {}
