import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TramiteAsociadoComponent } from './tramite-asociado.component';
import { TramiteAsociadoDetailComponent } from './tramite-asociado-detail.component';
import { TramiteAsociadoPopupComponent } from './tramite-asociado-dialog.component';
import { TramiteAsociadoDeletePopupComponent } from './tramite-asociado-delete-dialog.component';

export const tramiteAsociadoRoute: Routes = [
    {
        path: 'tramite-asociado',
        component: TramiteAsociadoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tramite-asociado/:id',
        component: TramiteAsociadoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tramiteAsociadoPopupRoute: Routes = [
    {
        path: 'tramite-asociado-new',
        component: TramiteAsociadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tramite-asociado/:id/edit',
        component: TramiteAsociadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tramite-asociado/:id/delete',
        component: TramiteAsociadoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
