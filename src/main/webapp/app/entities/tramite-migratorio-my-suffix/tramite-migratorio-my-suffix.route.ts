import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TramiteMigratorioMySuffixComponent } from './tramite-migratorio-my-suffix.component';
import { TramiteMigratorioMySuffixDetailComponent } from './tramite-migratorio-my-suffix-detail.component';
import { TramiteMigratorioMySuffixPopupComponent } from './tramite-migratorio-my-suffix-dialog.component';
import { TramiteMigratorioMySuffixDeletePopupComponent } from './tramite-migratorio-my-suffix-delete-dialog.component';

@Injectable()
export class TramiteMigratorioMySuffixResolvePagingParams implements Resolve<any> {

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
        path: 'tramite-migratorio-my-suffix',
        component: TramiteMigratorioMySuffixComponent,
        resolve: {
            'pagingParams': TramiteMigratorioMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteMigratorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tramite-migratorio-my-suffix/:id',
        component: TramiteMigratorioMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteMigratorio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tramiteMigratorioPopupRoute: Routes = [
    {
        path: 'tramite-migratorio-my-suffix-new',
        component: TramiteMigratorioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteMigratorio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tramite-migratorio-my-suffix/:id/edit',
        component: TramiteMigratorioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteMigratorio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tramite-migratorio-my-suffix/:id/delete',
        component: TramiteMigratorioMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteMigratorio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
