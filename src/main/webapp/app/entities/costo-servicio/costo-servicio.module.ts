import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
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
import { registerLocaleData } from '@angular/common';
import localeEsMX from '@angular/common/locales/es-MX';

const ENTITY_STATES = [
    ...costoServicioRoute,
    ...costoServicioPopupRoute,
];

registerLocaleData(localeEsMX, 'es-MX');

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
        { provide: LOCALE_ID, useValue: 'es-MX' }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaCostoServicioModule {}
