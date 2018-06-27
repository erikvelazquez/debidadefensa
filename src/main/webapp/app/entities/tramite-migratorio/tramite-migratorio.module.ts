import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaTramiteMigratorioModule {}
