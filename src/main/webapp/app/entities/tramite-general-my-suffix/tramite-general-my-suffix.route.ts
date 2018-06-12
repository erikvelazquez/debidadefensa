import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TramiteGeneralMySuffixComponent } from './tramite-general-my-suffix.component';
import { TramiteGeneralMySuffixDetailComponent } from './tramite-general-my-suffix-detail.component';
import { TramiteGeneralMySuffixPopupComponent } from './tramite-general-my-suffix-dialog.component';
import { TramiteGeneralMySuffixDeletePopupComponent } from './tramite-general-my-suffix-delete-dialog.component';

@Injectable()
export class TramiteGeneralMySuffixResolvePagingParams implements Resolve<any> {

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
        path: 'tramite-general-my-suffix',
        component: TramiteGeneralMySuffixComponent,
        resolve: {
            'pagingParams': TramiteGeneralMySuffixResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteGeneral.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tramite-general-my-suffix/:id',
        component: TramiteGeneralMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteGeneral.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tramiteGeneralPopupRoute: Routes = [
    {
        path: 'tramite-general-my-suffix-new',
        component: TramiteGeneralMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteGeneral.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tramite-general-my-suffix/:id/edit',
        component: TramiteGeneralMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteGeneral.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tramite-general-my-suffix/:id/delete',
        component: TramiteGeneralMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteGeneral.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
