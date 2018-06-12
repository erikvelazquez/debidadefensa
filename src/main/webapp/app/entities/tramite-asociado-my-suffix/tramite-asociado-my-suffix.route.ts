import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TramiteAsociadoMySuffixComponent } from './tramite-asociado-my-suffix.component';
import { TramiteAsociadoMySuffixDetailComponent } from './tramite-asociado-my-suffix-detail.component';
import { TramiteAsociadoMySuffixPopupComponent } from './tramite-asociado-my-suffix-dialog.component';
import { TramiteAsociadoMySuffixDeletePopupComponent } from './tramite-asociado-my-suffix-delete-dialog.component';

export const tramiteAsociadoRoute: Routes = [
    {
        path: 'tramite-asociado-my-suffix',
        component: TramiteAsociadoMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tramite-asociado-my-suffix/:id',
        component: TramiteAsociadoMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tramiteAsociadoPopupRoute: Routes = [
    {
        path: 'tramite-asociado-my-suffix-new',
        component: TramiteAsociadoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tramite-asociado-my-suffix/:id/edit',
        component: TramiteAsociadoMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tramite-asociado-my-suffix/:id/delete',
        component: TramiteAsociadoMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tramiteAsociado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
