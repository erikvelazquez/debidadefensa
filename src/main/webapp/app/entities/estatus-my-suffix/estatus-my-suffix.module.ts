import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    EstatusMySuffixService,
    EstatusMySuffixPopupService,
    EstatusMySuffixComponent,
    EstatusMySuffixDetailComponent,
    EstatusMySuffixDialogComponent,
    EstatusMySuffixPopupComponent,
    EstatusMySuffixDeletePopupComponent,
    EstatusMySuffixDeleteDialogComponent,
    estatusRoute,
    estatusPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estatusRoute,
    ...estatusPopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EstatusMySuffixComponent,
        EstatusMySuffixDetailComponent,
        EstatusMySuffixDialogComponent,
        EstatusMySuffixDeleteDialogComponent,
        EstatusMySuffixPopupComponent,
        EstatusMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        EstatusMySuffixComponent,
        EstatusMySuffixDialogComponent,
        EstatusMySuffixPopupComponent,
        EstatusMySuffixDeleteDialogComponent,
        EstatusMySuffixDeletePopupComponent,
    ],
    providers: [
        EstatusMySuffixService,
        EstatusMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaEstatusMySuffixModule {}
