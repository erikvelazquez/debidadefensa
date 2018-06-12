import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DebidadefensaSharedModule } from '../../shared';
import {
    TramiteMigratorioMySuffixService,
    TramiteMigratorioMySuffixPopupService,
    TramiteMigratorioMySuffixComponent,
    TramiteMigratorioMySuffixDetailComponent,
    TramiteMigratorioMySuffixDialogComponent,
    TramiteMigratorioMySuffixPopupComponent,
    TramiteMigratorioMySuffixDeletePopupComponent,
    TramiteMigratorioMySuffixDeleteDialogComponent,
    tramiteMigratorioRoute,
    tramiteMigratorioPopupRoute,
    TramiteMigratorioMySuffixResolvePagingParams,
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
        TramiteMigratorioMySuffixComponent,
        TramiteMigratorioMySuffixDetailComponent,
        TramiteMigratorioMySuffixDialogComponent,
        TramiteMigratorioMySuffixDeleteDialogComponent,
        TramiteMigratorioMySuffixPopupComponent,
        TramiteMigratorioMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        TramiteMigratorioMySuffixComponent,
        TramiteMigratorioMySuffixDialogComponent,
        TramiteMigratorioMySuffixPopupComponent,
        TramiteMigratorioMySuffixDeleteDialogComponent,
        TramiteMigratorioMySuffixDeletePopupComponent,
    ],
    providers: [
        TramiteMigratorioMySuffixService,
        TramiteMigratorioMySuffixPopupService,
        TramiteMigratorioMySuffixResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DebidadefensaTramiteMigratorioMySuffixModule {}
