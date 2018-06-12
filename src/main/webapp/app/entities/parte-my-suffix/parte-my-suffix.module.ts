import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    ParteMySuffixService,
    ParteMySuffixPopupService,
    ParteMySuffixComponent,
    ParteMySuffixDetailComponent,
    ParteMySuffixDialogComponent,
    ParteMySuffixPopupComponent,
    ParteMySuffixDeletePopupComponent,
    ParteMySuffixDeleteDialogComponent,
    parteRoute,
    partePopupRoute,
} from './';

const ENTITY_STATES = [
    ...parteRoute,
    ...partePopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ParteMySuffixComponent,
        ParteMySuffixDetailComponent,
        ParteMySuffixDialogComponent,
        ParteMySuffixDeleteDialogComponent,
        ParteMySuffixPopupComponent,
        ParteMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        ParteMySuffixComponent,
        ParteMySuffixDialogComponent,
        ParteMySuffixPopupComponent,
        ParteMySuffixDeleteDialogComponent,
        ParteMySuffixDeletePopupComponent,
    ],
    providers: [
        ParteMySuffixService,
        ParteMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaParteMySuffixModule {}
