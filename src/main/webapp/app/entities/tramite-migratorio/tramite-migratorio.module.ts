import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    TramiteMigratorioService,
    TramiteMigratorioPopupService,
    TramiteMigratorioComponent,
    TramiteMigratorioDetailComponent,
    TramiteMigratorioDialogComponent,
    TramiteMigratorioPopupComponent,
    TramiteMigratorioDeletePopupComponent,
    TramiteMigratorioDeleteDialogComponent,
    tramiteMigratorioRoute,
    tramiteMigratorioPopupRoute,
    TramiteMigratorioResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...tramiteMigratorioRoute,
    ...tramiteMigratorioPopupRoute,
];
import { registerLocaleData } from '@angular/common';
import localeEsMX from '@angular/common/locales/es-MX';

@NgModule({
    imports: [
        DebidadefensaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TramiteMigratorioComponent,
        TramiteMigratorioDetailComponent,
        TramiteMigratorioDialogComponent,
        TramiteMigratorioDeleteDialogComponent,
        TramiteMigratorioPopupComponent,
        TramiteMigratorioDeletePopupComponent,
    ],
    entryComponents: [
        TramiteMigratorioComponent,
        TramiteMigratorioDialogComponent,
        TramiteMigratorioPopupComponent,
        TramiteMigratorioDeleteDialogComponent,
        TramiteMigratorioDeletePopupComponent,
    ],
    providers: [
        TramiteMigratorioService,
        TramiteMigratorioPopupService,
        TramiteMigratorioResolvePagingParams,
        { provide: LOCALE_ID, useValue: 'es-MX' }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaTramiteMigratorioModule {}
