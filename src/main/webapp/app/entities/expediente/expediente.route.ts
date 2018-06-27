import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ExpedienteComponent } from './expediente.component';
import { ExpedienteDetailComponent } from './expediente-detail.component';
import { ExpedientePopupComponent } from './expediente-dialog.component';
import { ExpedienteDeletePopupComponent } from './expediente-delete-dialog.component';

export const expedienteRoute: Routes = [
    {
        path: 'expediente',
        component: ExpedienteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expediente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'expediente/:id',
        component: ExpedienteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expediente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const expedientePopupRoute: Routes = [
    {
        path: 'expediente-new',
        component: ExpedientePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expediente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expediente/:id/edit',
        component: ExpedientePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expediente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expediente/:id/delete',
        component: ExpedienteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expediente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
