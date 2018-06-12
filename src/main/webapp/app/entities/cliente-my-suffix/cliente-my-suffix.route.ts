import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClienteMySuffixComponent } from './cliente-my-suffix.component';
import { ClienteMySuffixDetailComponent } from './cliente-my-suffix-detail.component';
import { ClienteMySuffixPopupComponent } from './cliente-my-suffix-dialog.component';
import { ClienteMySuffixDeletePopupComponent } from './cliente-my-suffix-delete-dialog.component';

export const clienteRoute: Routes = [
    {
        path: 'cliente-my-suffix',
        component: ClienteMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cliente-my-suffix/:id',
        component: ClienteMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientePopupRoute: Routes = [
    {
        path: 'cliente-my-suffix-new',
        component: ClienteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cliente-my-suffix/:id/edit',
        component: ClienteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cliente-my-suffix/:id/delete',
        component: ClienteMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.cliente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
