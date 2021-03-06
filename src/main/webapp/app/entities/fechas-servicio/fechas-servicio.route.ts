import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { FechasServicioComponent } from './fechas-servicio.component';
import { FechasServicioDetailComponent } from './fechas-servicio-detail.component';
import { FechasServicioPopupComponent } from './fechas-servicio-dialog.component';
import { FechasServicioDeletePopupComponent } from './fechas-servicio-delete-dialog.component';
import { AgendaPopupComponent } from './agenda.component';

export const fechasServicioRoute: Routes = [
    {
        path: 'fechas-servicio',
        component: FechasServicioComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.fechasServicio.home.titleGeneral'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'fechas-servicio/:id',
        component: FechasServicioDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.fechasServicio.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fechasServicioPopupRoute: Routes = [
    {
        path: 'fechas-servicio-new',
        component: FechasServicioPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.fechasServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'fechas-servicio-newby/:idTramite/:tiposervicio',
        component: FechasServicioPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.costoServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'fechas-servicio/:id/edit',
        component: FechasServicioPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.fechasServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agenda/:id',
        component: AgendaPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'Agenda'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }, {
        path: 'fechas-servicio/:id/delete',
        component: FechasServicioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.fechasServicio.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
