import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EstatusComponent } from './estatus.component';
import { EstatusDetailComponent } from './estatus-detail.component';
import { EstatusPopupComponent } from './estatus-dialog.component';
import { EstatusDeletePopupComponent } from './estatus-delete-dialog.component';

export const estatusRoute: Routes = [
    {
        path: 'estatus',
        component: EstatusComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.estatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estatus/:id',
        component: EstatusDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.estatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estatusPopupRoute: Routes = [
    {
        path: 'estatus-new',
        component: EstatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.estatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estatus/:id/edit',
        component: EstatusPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.estatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estatus/:id/delete',
        component: EstatusDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.estatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
