import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DocumentosMySuffixComponent } from './documentos-my-suffix.component';
import { DocumentosMySuffixDetailComponent } from './documentos-my-suffix-detail.component';
import { DocumentosMySuffixPopupComponent } from './documentos-my-suffix-dialog.component';
import { DocumentosMySuffixDeletePopupComponent } from './documentos-my-suffix-delete-dialog.component';

export const documentosRoute: Routes = [
    {
        path: 'documentos-my-suffix',
        component: DocumentosMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.documentos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'documentos-my-suffix/:id',
        component: DocumentosMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.documentos.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentosPopupRoute: Routes = [
    {
        path: 'documentos-my-suffix-new',
        component: DocumentosMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.documentos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'documentos-my-suffix/:id/edit',
        component: DocumentosMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.documentos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'documentos-my-suffix/:id/delete',
        component: DocumentosMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.documentos.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
