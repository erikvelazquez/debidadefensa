import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CostoServicioComponent } from './costo-servicio.component';
import { CostoServicioDetailComponent } from './costo-servicio-detail.component';
import { CostoServicioPopupComponent } from './costo-servicio-dialog.component';
import { CostoServicioDeletePopupComponent } from './costo-servicio-delete-dialog.component';

export const costoServicioRoute: Routes = [
    {
        path: 'expediente/:id/costo-servicio/:id/:tiposervicio/:esGeneral',
        component: CostoServicioComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tramite-migratorio/:id/costo-servicio/:id/:tiposervicio/:esGeneral',
        component: CostoServicioComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tramite-general/:id/costo-servicio/:id/:tiposervicio/:esGeneral',
        component: CostoServicioComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'costo-servicio',
        component: CostoServicioComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'costo-servicio/:id',
        component: CostoServicioDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'costo-servicio/:id/:tiposervicio',
        component: CostoServicioComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costoServicioPopupRoute: Routes = [
    {
        path: 'costo-servicio-view',
        component: CostoServicioComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'costo-servicio-new/:idTramite/:tiposervicio',
        component: CostoServicioPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'costo-servicio/:id/edit',
        component: CostoServicioPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'costo-servicio/:id/delete',
        component: CostoServicioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
