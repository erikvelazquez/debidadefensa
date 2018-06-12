import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FechasServicioMySuffixComponent } from './fechas-servicio-my-suffix.component';
import { FechasServicioMySuffixDetailComponent } from './fechas-servicio-my-suffix-detail.component';
import { FechasServicioMySuffixPopupComponent } from './fechas-servicio-my-suffix-dialog.component';
import { FechasServicioMySuffixDeletePopupComponent } from './fechas-servicio-my-suffix-delete-dialog.component';

export const fechasServicioRoute: Routes = [
    {
        path: 'fechas-servicio-my-suffix',
        component: FechasServicioMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.fechasServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fechas-servicio-my-suffix/:id',
        component: FechasServicioMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.fechasServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fechasServicioPopupRoute: Routes = [
    {
        path: 'fechas-servicio-my-suffix-new',
        component: FechasServicioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.fechasServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fechas-servicio-my-suffix/:id/edit',
        component: FechasServicioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.fechasServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'fechas-servicio-my-suffix/:id/delete',
        component: FechasServicioMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.fechasServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
