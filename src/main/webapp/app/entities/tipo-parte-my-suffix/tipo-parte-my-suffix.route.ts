import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TipoParteMySuffixComponent } from './tipo-parte-my-suffix.component';
import { TipoParteMySuffixDetailComponent } from './tipo-parte-my-suffix-detail.component';
import { TipoParteMySuffixPopupComponent } from './tipo-parte-my-suffix-dialog.component';
import { TipoParteMySuffixDeletePopupComponent } from './tipo-parte-my-suffix-delete-dialog.component';

export const tipoParteRoute: Routes = [
    {
        path: 'tipo-parte-my-suffix',
        component: TipoParteMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoParte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-parte-my-suffix/:id',
        component: TipoParteMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoParte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoPartePopupRoute: Routes = [
    {
        path: 'tipo-parte-my-suffix-new',
        component: TipoParteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoParte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-parte-my-suffix/:id/edit',
        component: TipoParteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoParte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-parte-my-suffix/:id/delete',
        component: TipoParteMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoParte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
