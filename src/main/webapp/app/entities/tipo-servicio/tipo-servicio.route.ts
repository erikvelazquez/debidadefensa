import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TipoServicioComponent } from './tipo-servicio.component';
import { TipoServicioDetailComponent } from './tipo-servicio-detail.component';
import { TipoServicioPopupComponent } from './tipo-servicio-dialog.component';
import { TipoServicioDeletePopupComponent } from './tipo-servicio-delete-dialog.component';

export const tipoServicioRoute: Routes = [
    {
        path: 'tipo-servicio',
        component: TipoServicioComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tipoServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-servicio/:id',
        component: TipoServicioDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tipoServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoServicioPopupRoute: Routes = [
    {
        path: 'tipo-servicio-new',
        component: TipoServicioPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tipoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-servicio/:id/edit',
        component: TipoServicioPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tipoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-servicio/:id/delete',
        component: TipoServicioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.tipoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
