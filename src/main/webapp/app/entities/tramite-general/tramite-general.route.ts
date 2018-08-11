import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TramiteGeneralComponent } from './tramite-general.component';
import { TramiteGeneralDetailComponent } from './tramite-general-detail.component';
import { TramiteGeneralPopupComponent } from './tramite-general-dialog.component';
import { TramiteGeneralDeletePopupComponent } from './tramite-general-delete-dialog.component';

@Injectable()
export class TramiteGeneralResolvePagingParams implements Resolve<any> {

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

export const tramiteGeneralRoute: Routes = [
    {
        path: 'tramite-general',
        component: TramiteGeneralComponent,
        resolve: {
            'pagingParams': TramiteGeneralResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tramiteGeneral.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tramite-general-usuario/:id',
        component: TramiteGeneralComponent,
        resolve: {
            'pagingParams': TramiteGeneralResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tramiteGeneral.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tramite-general/:id',
        component: TramiteGeneralDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tramiteGeneral.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tramiteGeneralPopupRoute: Routes = [
    {
        path: 'tramite-general-new',
        component: TramiteGeneralPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tramiteGeneral.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tramite-general/:id/edit',
        component: TramiteGeneralPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tramiteGeneral.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tramite-general/:id/delete',
        component: TramiteGeneralDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tramiteGeneral.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
