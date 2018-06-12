import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { EstatusMySuffixComponent } from './estatus-my-suffix.component';
import { EstatusMySuffixDetailComponent } from './estatus-my-suffix-detail.component';
import { EstatusMySuffixPopupComponent } from './estatus-my-suffix-dialog.component';
import { EstatusMySuffixDeletePopupComponent } from './estatus-my-suffix-delete-dialog.component';

export const estatusRoute: Routes = [
    {
        path: 'estatus-my-suffix',
        component: EstatusMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.estatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estatus-my-suffix/:id',
        component: EstatusMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.estatus.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estatusPopupRoute: Routes = [
    {
        path: 'estatus-my-suffix-new',
        component: EstatusMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.estatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estatus-my-suffix/:id/edit',
        component: EstatusMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.estatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estatus-my-suffix/:id/delete',
        component: EstatusMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.estatus.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
