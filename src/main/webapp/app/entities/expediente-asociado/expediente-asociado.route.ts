import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ExpedienteAsociadoComponent } from './expediente-asociado.component';
import { ExpedienteAsociadoDetailComponent } from './expediente-asociado-detail.component';
import { ExpedienteAsociadoPopupComponent } from './expediente-asociado-dialog.component';
import { ExpedienteAsociadoDeletePopupComponent } from './expediente-asociado-delete-dialog.component';

export const expedienteAsociadoRoute: Routes = [
    {
        path: 'expediente-asociado',
        component: ExpedienteAsociadoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expedienteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'expediente-asociado/:id',
        component: ExpedienteAsociadoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expedienteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const expedienteAsociadoPopupRoute: Routes = [
    {
        path: 'expediente-asociado-new',
        component: ExpedienteAsociadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expedienteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expediente-asociado-new/:idExpediente',
        component: ExpedienteAsociadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expedienteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expediente-asociado/:id/edit',
        component: ExpedienteAsociadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expedienteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expediente-asociado/:id/delete',
        component: ExpedienteAsociadoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expedienteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
