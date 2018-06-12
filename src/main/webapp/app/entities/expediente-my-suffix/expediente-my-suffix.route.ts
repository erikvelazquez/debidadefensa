import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ExpedienteMySuffixComponent } from './expediente-my-suffix.component';
import { ExpedienteMySuffixDetailComponent } from './expediente-my-suffix-detail.component';
import { ExpedienteMySuffixPopupComponent } from './expediente-my-suffix-dialog.component';
import { ExpedienteMySuffixDeletePopupComponent } from './expediente-my-suffix-delete-dialog.component';

export const expedienteRoute: Routes = [
    {
        path: 'expediente-my-suffix',
        component: ExpedienteMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expediente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'expediente-my-suffix/:id',
        component: ExpedienteMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expediente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const expedientePopupRoute: Routes = [
    {
        path: 'expediente-my-suffix-new',
        component: ExpedienteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expediente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expediente-my-suffix/:id/edit',
        component: ExpedienteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expediente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expediente-my-suffix/:id/delete',
        component: ExpedienteMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expediente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
