import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TramiteGeneral } from './tramite-general.model';
import { TramiteGeneralPopupService } from './tramite-general-popup.service';
import { TramiteGeneralService } from './tramite-general.service';

@Component({
    selector: 'jhi-tramite-general-delete-dialog',
    templateUrl: './tramite-general-delete-dialog.component.html'
})
export class TramiteGeneralDeleteDialogComponent {

    tramiteGeneral: TramiteGeneral;

    constructor(
        private tramiteGeneralService: TramiteGeneralService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tramiteGeneralService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tramiteGeneralListModification',
                content: 'Deleted an tramiteGeneral'
            });
            this.activeModal.dismiss(true);
        }, (res: HttpErrorResponse) => this.onError('debidadefensaApp.tramiteGeneral.erroreliminar'));
    }

    private onError(error) {
        this.jhiAlertService.error(error, null, null);
        setTimeout(() => {
            this.activeModal.dismiss(true);
        }, 5000);
    }
}

@Component({
    selector: 'jhi-tramite-general-delete-popup',
    template: ''
})
export class TramiteGeneralDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tramiteGeneralPopupService: TramiteGeneralPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tramiteGeneralPopupService
                .open(TramiteGeneralDeleteDialogComponent as Component, params['idCliente'], params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
