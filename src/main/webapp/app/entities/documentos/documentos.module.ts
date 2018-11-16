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
    DocumentosPdfviewerDialogComponent,
    DocumentosPdfviewerPopupComponent,
    documentosRoute,
    documentosPopupRoute,
} from './';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

const ENTITY_STATES = [
    ...documentosRoute,
    ...documentosPopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        RoundProgressModule
    ],
    declarations: [
        DocumentosComponent,
        DocumentosDetailComponent,
        DocumentosDialogComponent,
        DocumentosDeleteDialogComponent,
        DocumentosPdfviewerDialogComponent,
        DocumentosPdfviewerPopupComponent,
        DocumentosPopupComponent,
        DocumentosDeletePopupComponent,
    ],
    entryComponents: [
        DocumentosComponent,
        DocumentosDialogComponent,
        DocumentosPopupComponent,
        DocumentosDeleteDialogComponent,
        DocumentosPdfviewerDialogComponent,
        DocumentosPdfviewerPopupComponent,
        DocumentosDeletePopupComponent,
    ],
    providers: [
        DocumentosService,
        DocumentosPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaDocumentosModule {}
