import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteAsociado } from './tramite-asociado.model';
import { TramiteAsociadoPopupService } from './tramite-asociado-popup.service';
import { TramiteAsociadoService } from './tramite-asociado.service';

@Component({
    selector: 'jhi-tramite-asociado-delete-dialog',
    templateUrl: './tramite-asociado-delete-dialog.component.html'
})
export class TramiteAsociadoDeleteDialogComponent {

    tramiteAsociado: TramiteAsociado;

    constructor(
        private tramiteAsociadoService: TramiteAsociadoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tramiteAsociadoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tramiteAsociadoListModification',
                content: 'Deleted an tramiteAsociado'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tramite-asociado-delete-popup',
    template: ''
})
export class TramiteAsociadoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tramiteAsociadoPopupService: TramiteAsociadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tramiteAsociadoPopupService
                .open(TramiteAsociadoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
