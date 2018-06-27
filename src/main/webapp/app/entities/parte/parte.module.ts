import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    ParteService,
    PartePopupService,
    ParteComponent,
    ParteDetailComponent,
    ParteDialogComponent,
    PartePopupComponent,
    ParteDeletePopupComponent,
    ParteDeleteDialogComponent,
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
        ParteComponent,
        ParteDetailComponent,
        ParteDialogComponent,
        ParteDeleteDialogComponent,
        PartePopupComponent,
        ParteDeletePopupComponent,
    ],
    entryComponents: [
        ParteComponent,
        ParteDialogComponent,
        PartePopupComponent,
        ParteDeleteDialogComponent,
        ParteDeletePopupComponent,
    ],
    providers: [
        ParteService,
        PartePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaParteModule {}
