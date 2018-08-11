import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DocumentosComponent } from './documentos.component';
import { DocumentosDetailComponent } from './documentos-detail.component';
import { DocumentosPopupComponent } from './documentos-dialog.component';
import { DocumentosDeletePopupComponent } from './documentos-delete-dialog.component';

export const documentosRoute: Routes = [
    {
        path: 'documentos',
        component: DocumentosComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.documentos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'documentos/:id',
        component: DocumentosDetailComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.documentos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentosPopupRoute: Routes = [
    {
        path: 'documentos-new',
        component: DocumentosPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.documentos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'documentos/:id/edit',
        component: DocumentosPopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.documentos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'documentos/:id/delete',
        component: DocumentosDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER', 'ROLE_DIRECTOR', 'ROLE_ABOGADO', 'ROLE_AUXILIAR', 'ROLE_ADMIN'],
            pageTitle: 'debidadefensaApp.documentos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
