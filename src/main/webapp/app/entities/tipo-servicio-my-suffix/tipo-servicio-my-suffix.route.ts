import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TipoServicioMySuffixComponent } from './tipo-servicio-my-suffix.component';
import { TipoServicioMySuffixDetailComponent } from './tipo-servicio-my-suffix-detail.component';
import { TipoServicioMySuffixPopupComponent } from './tipo-servicio-my-suffix-dialog.component';
import { TipoServicioMySuffixDeletePopupComponent } from './tipo-servicio-my-suffix-delete-dialog.component';

export const tipoServicioRoute: Routes = [
    {
        path: 'tipo-servicio-my-suffix',
        component: TipoServicioMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-servicio-my-suffix/:id',
        component: TipoServicioMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoServicioPopupRoute: Routes = [
    {
        path: 'tipo-servicio-my-suffix-new',
        component: TipoServicioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-servicio-my-suffix/:id/edit',
        component: TipoServicioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-servicio-my-suffix/:id/delete',
        component: TipoServicioMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.tipoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
