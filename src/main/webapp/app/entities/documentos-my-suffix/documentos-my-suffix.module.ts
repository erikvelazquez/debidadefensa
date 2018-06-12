import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    DocumentosMySuffixService,
    DocumentosMySuffixPopupService,
    DocumentosMySuffixComponent,
    DocumentosMySuffixDetailComponent,
    DocumentosMySuffixDialogComponent,
    DocumentosMySuffixPopupComponent,
    DocumentosMySuffixDeletePopupComponent,
    DocumentosMySuffixDeleteDialogComponent,
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
        DocumentosMySuffixComponent,
        DocumentosMySuffixDetailComponent,
        DocumentosMySuffixDialogComponent,
        DocumentosMySuffixDeleteDialogComponent,
        DocumentosMySuffixPopupComponent,
        DocumentosMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        DocumentosMySuffixComponent,
        DocumentosMySuffixDialogComponent,
        DocumentosMySuffixPopupComponent,
        DocumentosMySuffixDeleteDialogComponent,
        DocumentosMySuffixDeletePopupComponent,
    ],
    providers: [
        DocumentosMySuffixService,
        DocumentosMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaDocumentosMySuffixModule {}
