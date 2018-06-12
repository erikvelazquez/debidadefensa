import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExpedienteAsociadoMySuffix } from './expediente-asociado-my-suffix.model';
import { ExpedienteAsociadoMySuffixPopupService } from './expediente-asociado-my-suffix-popup.service';
import { ExpedienteAsociadoMySuffixService } from './expediente-asociado-my-suffix.service';

@Component({
    selector: 'jhi-expediente-asociado-my-suffix-delete-dialog',
    templateUrl: './expediente-asociado-my-suffix-delete-dialog.component.html'
})
export class ExpedienteAsociadoMySuffixDeleteDialogComponent {

    expedienteAsociado: ExpedienteAsociadoMySuffix;

    constructor(
        private expedienteAsociadoService: ExpedienteAsociadoMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.expedienteAsociadoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'expedienteAsociadoListModification',
                content: 'Deleted an expedienteAsociado'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-expediente-asociado-my-suffix-delete-popup',
    template: ''
})
export class ExpedienteAsociadoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private expedienteAsociadoPopupService: ExpedienteAsociadoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.expedienteAsociadoPopupService
                .open(ExpedienteAsociadoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
