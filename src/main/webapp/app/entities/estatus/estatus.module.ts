import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    EstatusService,
    EstatusPopupService,
    EstatusComponent,
    EstatusDetailComponent,
    EstatusDialogComponent,
    EstatusPopupComponent,
    EstatusDeletePopupComponent,
    EstatusDeleteDialogComponent,
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
        EstatusComponent,
        EstatusDetailComponent,
        EstatusDialogComponent,
        EstatusDeleteDialogComponent,
        EstatusPopupComponent,
        EstatusDeletePopupComponent,
    ],
    entryComponents: [
        EstatusComponent,
        EstatusDialogComponent,
        EstatusPopupComponent,
        EstatusDeleteDialogComponent,
        EstatusDeletePopupComponent,
    ],
    providers: [
        EstatusService,
        EstatusPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaEstatusModule {}
