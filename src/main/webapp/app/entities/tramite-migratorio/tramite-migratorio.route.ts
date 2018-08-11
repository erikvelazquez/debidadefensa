import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TramiteMigratorioComponent } from './tramite-migratorio.component';
import { TramiteMigratorioDetailComponent } from './tramite-migratorio-detail.component';
import { TramiteMigratorioPopupComponent } from './tramite-migratorio-dialog.component';
import { TramiteMigratorioDeletePopupComponent } from './tramite-migratorio-delete-dialog.component';

@Injectable()
export class TramiteMigratorioResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const tramiteMigratorioRoute: Routes = [
    {
        path: 'tramite-migratorio',
        component: TramiteMigratorioComponent,
        resolve: {
            'pagingParams': TramiteMigratorioResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tramiteMigratorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tramite-migratorio-usuario/:id',
        component: TramiteMigratorioComponent,
        resolve: {
            'pagingParams': TramiteMigratorioResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tramiteMigratorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tramite-migratorio/:id',
        component: TramiteMigratorioDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tramiteMigratorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tramite-migratorio-usuario/tramite-migratorio/:id',
        component: TramiteMigratorioDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tramiteMigratorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tramiteMigratorioPopupRoute: Routes = [
    {
        path: 'tramite-migratorio-new',
        component: TramiteMigratorioPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tramiteMigratorio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tramite-migratorio/:id/edit',
        component: TramiteMigratorioPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tramiteMigratorio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tramite-migratorio/:id/delete',
        component: TramiteMigratorioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tramiteMigratorio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
