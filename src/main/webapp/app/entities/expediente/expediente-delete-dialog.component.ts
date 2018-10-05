import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Expediente } from './expediente.model';
import { ExpedientePopupService } from './expediente-popup.service';
import { ExpedienteService } from './expediente.service';

@Component({
    selector: 'jhi-expediente-delete-dialog',
    templateUrl: './expediente-delete-dialog.component.html'
})
export class ExpedienteDeleteDialogComponent {

    expediente: Expediente;

    constructor(
        private expedienteService: ExpedienteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.expedienteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'expedienteListModification',
                content: 'Deleted an expediente'
            });
            this.activeModal.dismiss(true);
        }, (res: HttpErrorResponse) => this.onError('debidadefensaApp.expediente.erroreliminar'));
    }

    private onError(error) {
        this.jhiAlertService.error(error, null, null);
    }
}

@Component({
    selector: 'jhi-expediente-delete-popup',
    template: ''
})
export class ExpedienteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private expedientePopupService: ExpedientePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.expedientePopupService
                .open(ExpedienteDeleteDialogComponent as Component, params['idCliente'], params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
