import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DebidadefensaSharedModule } from '../../shared';
import {
    CostoServicioService,
    CostoServicioPopupService,
    CostoServicioComponent,
    CostoServicioDetailComponent,
    CostoServicioDialogComponent,
    CostoServicioPopupComponent,
    CostoServicioDeletePopupComponent,
    CostoServicioDeleteDialogComponent,
    costoServicioRoute,
    costoServicioPopupRoute,
    CostosPagosDialogComponent,
    CostosPagosPopupComponent,
} from './';

const ENTITY_STATES = [
    ...costoServicioRoute,
    ...costoServicioPopupRoute,
];

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        CurrencyMaskModule
    ],
    declarations: [
        CostoServicioComponent,
        CostoServicioDetailComponent,
        CostoServicioDialogComponent,
        CostoServicioDeleteDialogComponent,
        CostoServicioPopupComponent,
        CostoServicioDeletePopupComponent,
        CostosPagosDialogComponent,
        CostosPagosPopupComponent,
    ],
    entryComponents: [
        CostoServicioComponent,
        CostoServicioDialogComponent,
        CostoServicioPopupComponent,
        CostoServicioDeleteDialogComponent,
        CostoServicioDeletePopupComponent,
        CostosPagosDialogComponent,
        CostosPagosPopupComponent,
    ],
    providers: [
        CostoServicioService,
        CostoServicioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaCostoServicioModule {}
