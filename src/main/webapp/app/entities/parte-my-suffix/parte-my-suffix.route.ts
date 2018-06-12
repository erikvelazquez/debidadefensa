import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ParteMySuffixComponent } from './parte-my-suffix.component';
import { ParteMySuffixDetailComponent } from './parte-my-suffix-detail.component';
import { ParteMySuffixPopupComponent } from './parte-my-suffix-dialog.component';
import { ParteMySuffixDeletePopupComponent } from './parte-my-suffix-delete-dialog.component';

export const parteRoute: Routes = [
    {
        path: 'parte-my-suffix',
        component: ParteMySuffixComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.parte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'parte-my-suffix/:id',
        component: ParteMySuffixDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.parte.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const partePopupRoute: Routes = [
    {
        path: 'parte-my-suffix-new',
        component: ParteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.parte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parte-my-suffix/:id/edit',
        component: ParteMySuffixPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.parte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'parte-my-suffix/:id/delete',
        component: ParteMySuffixDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'debidadefensaApp.parte.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
