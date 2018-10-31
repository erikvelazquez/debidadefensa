import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExpedienteAsociado } from './expediente-asociado.model';
import { ExpedienteAsociadoPopupService } from './expediente-asociado-popup.service';
import { ExpedienteAsociadoService } from './expediente-asociado.service';

@Component({
    selector: 'jhi-expediente-asociado-delete-dialog',
    templateUrl: './expediente-asociado-delete-dialog.component.html'
})
export class ExpedienteAsociadoDeleteDialogComponent {

    expedienteAsociado: ExpedienteAsociado;

    constructor(
        private expedienteAsociadoService: ExpedienteAsociadoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.expedienteAsociadoService.delete(id).subscribe((response) => {
            // this.eventManager.broadcast({
            //     name: 'expedienteAsociadoListModification',
            //     content: 'Deleted an expedienteAsociado'
            // });

            this.eventManager.broadcast({ name: 'expedienteListModification', content: 'OK'});
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-expediente-asociado-delete-popup',
    template: ''
})
export class ExpedienteAsociadoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private expedienteAsociadoPopupService: ExpedienteAsociadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.expedienteAsociadoPopupService
                .open(ExpedienteAsociadoDeleteDialogComponent as Component, params['idExpediente'], params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
