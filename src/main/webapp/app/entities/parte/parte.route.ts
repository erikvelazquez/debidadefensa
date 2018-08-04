import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ParteComponent } from './parte.component';
import { ParteDetailComponent } from './parte-detail.component';
import { PartePopupComponent } from './parte-dialog.component';
import { ParteDeletePopupComponent } from './parte-delete-dialog.component';

export const parteRoute: Routes = [
    {
        path: 'parte',
        component: ParteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.parte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'parte/:id',
        component: ParteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.parte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const partePopupRoute: Routes = [
    {
        path: 'parte-new/:idTramite',
        component: PartePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.parte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parte/:id/edit',
        component: PartePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.parte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parte/:id/delete',
        component: ParteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.parte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
