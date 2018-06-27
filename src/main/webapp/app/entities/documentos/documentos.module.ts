import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    DocumentosService,
    DocumentosPopupService,
    DocumentosComponent,
    DocumentosDetailComponent,
    DocumentosDialogComponent,
    DocumentosPopupComponent,
    DocumentosDeletePopupComponent,
    DocumentosDeleteDialogComponent,
    documentosRoute,
    documentosPopupRoute,
} from './';

const ENTITY_STATES = [
    ...documentosRoute,
    ...documentosPopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DocumentosComponent,
        DocumentosDetailComponent,
        DocumentosDialogComponent,
        DocumentosDeleteDialogComponent,
        DocumentosPopupComponent,
        DocumentosDeletePopupComponent,
    ],
    entryComponents: [
        DocumentosComponent,
        DocumentosDialogComponent,
        DocumentosPopupComponent,
        DocumentosDeleteDialogComponent,
        DocumentosDeletePopupComponent,
    ],
    providers: [
        DocumentosService,
        DocumentosPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaDocumentosModule {}
