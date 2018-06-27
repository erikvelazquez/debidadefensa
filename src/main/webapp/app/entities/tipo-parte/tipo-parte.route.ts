import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TipoParteComponent } from './tipo-parte.component';
import { TipoParteDetailComponent } from './tipo-parte-detail.component';
import { TipoPartePopupComponent } from './tipo-parte-dialog.component';
import { TipoParteDeletePopupComponent } from './tipo-parte-delete-dialog.component';

export const tipoParteRoute: Routes = [
    {
        path: 'tipo-parte',
        component: TipoParteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoParte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-parte/:id',
        component: TipoParteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoParte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoPartePopupRoute: Routes = [
    {
        path: 'tipo-parte-new',
        component: TipoPartePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoParte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-parte/:id/edit',
        component: TipoPartePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoParte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-parte/:id/delete',
        component: TipoParteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoParte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
