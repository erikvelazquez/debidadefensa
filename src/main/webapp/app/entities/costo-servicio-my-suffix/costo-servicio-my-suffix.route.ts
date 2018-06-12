import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CostoServicioMySuffixComponent } from './costo-servicio-my-suffix.component';
import { CostoServicioMySuffixDetailComponent } from './costo-servicio-my-suffix-detail.component';
import { CostoServicioMySuffixPopupComponent } from './costo-servicio-my-suffix-dialog.component';
import { CostoServicioMySuffixDeletePopupComponent } from './costo-servicio-my-suffix-delete-dialog.component';

export const costoServicioRoute: Routes = [
    {
        path: 'costo-servicio-my-suffix',
        component: CostoServicioMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'costo-servicio-my-suffix/:id',
        component: CostoServicioMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costoServicioPopupRoute: Routes = [
    {
        path: 'costo-servicio-my-suffix-new',
        component: CostoServicioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'costo-servicio-my-suffix/:id/edit',
        component: CostoServicioMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'costo-servicio-my-suffix/:id/delete',
        component: CostoServicioMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
