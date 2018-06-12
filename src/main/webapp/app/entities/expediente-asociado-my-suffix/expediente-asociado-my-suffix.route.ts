import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ExpedienteAsociadoMySuffixComponent } from './expediente-asociado-my-suffix.component';
import { ExpedienteAsociadoMySuffixDetailComponent } from './expediente-asociado-my-suffix-detail.component';
import { ExpedienteAsociadoMySuffixPopupComponent } from './expediente-asociado-my-suffix-dialog.component';
import { ExpedienteAsociadoMySuffixDeletePopupComponent } from './expediente-asociado-my-suffix-delete-dialog.component';

export const expedienteAsociadoRoute: Routes = [
    {
        path: 'expediente-asociado-my-suffix',
        component: ExpedienteAsociadoMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expedienteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'expediente-asociado-my-suffix/:id',
        component: ExpedienteAsociadoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expedienteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const expedienteAsociadoPopupRoute: Routes = [
    {
        path: 'expediente-asociado-my-suffix-new',
        component: ExpedienteAsociadoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expedienteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expediente-asociado-my-suffix/:id/edit',
        component: ExpedienteAsociadoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expedienteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expediente-asociado-my-suffix/:id/delete',
        component: ExpedienteAsociadoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.expedienteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
