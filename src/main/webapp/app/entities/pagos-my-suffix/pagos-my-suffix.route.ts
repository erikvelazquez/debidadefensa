import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PagosMySuffixComponent } from './pagos-my-suffix.component';
import { PagosMySuffixDetailComponent } from './pagos-my-suffix-detail.component';
import { PagosMySuffixPopupComponent } from './pagos-my-suffix-dialog.component';
import { PagosMySuffixDeletePopupComponent } from './pagos-my-suffix-delete-dialog.component';

export const pagosRoute: Routes = [
    {
        path: 'pagos-my-suffix',
        component: PagosMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.pagos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pagos-my-suffix/:id',
        component: PagosMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.pagos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pagosPopupRoute: Routes = [
    {
        path: 'pagos-my-suffix-new',
        component: PagosMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.pagos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pagos-my-suffix/:id/edit',
        component: PagosMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.pagos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pagos-my-suffix/:id/delete',
        component: PagosMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.pagos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
