import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    ExpedienteMySuffixService,
    ExpedienteMySuffixPopupService,
    ExpedienteMySuffixComponent,
    ExpedienteMySuffixDetailComponent,
    ExpedienteMySuffixDialogComponent,
    ExpedienteMySuffixPopupComponent,
    ExpedienteMySuffixDeletePopupComponent,
    ExpedienteMySuffixDeleteDialogComponent,
    expedienteRoute,
    expedientePopupRoute,
} from './';

const ENTITY_STATES = [
    ...expedienteRoute,
    ...expedientePopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ExpedienteMySuffixComponent,
        ExpedienteMySuffixDetailComponent,
        ExpedienteMySuffixDialogComponent,
        ExpedienteMySuffixDeleteDialogComponent,
        ExpedienteMySuffixPopupComponent,
        ExpedienteMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ExpedienteMySuffixComponent,
        ExpedienteMySuffixDialogComponent,
        ExpedienteMySuffixPopupComponent,
        ExpedienteMySuffixDeleteDialogComponent,
        ExpedienteMySuffixDeletePopupComponent,
    ],
    providers: [
        ExpedienteMySuffixService,
        ExpedienteMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaExpedienteMySuffixModule {}
