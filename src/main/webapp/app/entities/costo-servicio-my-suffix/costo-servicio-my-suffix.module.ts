import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    CostoServicioMySuffixService,
    CostoServicioMySuffixPopupService,
    CostoServicioMySuffixComponent,
    CostoServicioMySuffixDetailComponent,
    CostoServicioMySuffixDialogComponent,
    CostoServicioMySuffixPopupComponent,
    CostoServicioMySuffixDeletePopupComponent,
    CostoServicioMySuffixDeleteDialogComponent,
    costoServicioRoute,
    costoServicioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...costoServicioRoute,
    ...costoServicioPopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CostoServicioMySuffixComponent,
        CostoServicioMySuffixDetailComponent,
        CostoServicioMySuffixDialogComponent,
        CostoServicioMySuffixDeleteDialogComponent,
        CostoServicioMySuffixPopupComponent,
        CostoServicioMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CostoServicioMySuffixComponent,
        CostoServicioMySuffixDialogComponent,
        CostoServicioMySuffixPopupComponent,
        CostoServicioMySuffixDeleteDialogComponent,
        CostoServicioMySuffixDeletePopupComponent,
    ],
    providers: [
        CostoServicioMySuffixService,
        CostoServicioMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaCostoServicioMySuffixModule {}
