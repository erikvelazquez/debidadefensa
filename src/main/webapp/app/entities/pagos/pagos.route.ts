import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PagosComponent } from './pagos.component';
import { PagosDetailComponent } from './pagos-detail.component';
import { PagosPopupComponent } from './pagos-dialog.component';
import { PagosDeletePopupComponent } from './pagos-delete-dialog.component';

export const pagosRoute: Routes = [
    {
        path: 'pagos',
        component: PagosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.pagos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pagos/:id',
        component: PagosDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.pagos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pagosPopupRoute: Routes = [
    {
        path: 'pagos-new',
        component: PagosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.pagos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pagos/:id/edit',
        component: PagosPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.pagos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pagos/:id/delete',
        component: PagosDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.pagos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
