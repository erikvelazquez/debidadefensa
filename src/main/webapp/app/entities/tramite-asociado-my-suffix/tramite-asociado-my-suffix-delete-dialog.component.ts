import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteAsociadoMySuffix } from './tramite-asociado-my-suffix.model';
import { TramiteAsociadoMySuffixPopupService } from './tramite-asociado-my-suffix-popup.service';
import { TramiteAsociadoMySuffixService } from './tramite-asociado-my-suffix.service';

@Component({
    selector: 'jhi-tramite-asociado-my-suffix-delete-dialog',
    templateUrl: './tramite-asociado-my-suffix-delete-dialog.component.html'
})
export class TramiteAsociadoMySuffixDeleteDialogComponent {

    tramiteAsociado: TramiteAsociadoMySuffix;

    constructor(
        private tramiteAsociadoService: TramiteAsociadoMySuffixService,
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
    selector: 'jhi-tramite-asociado-my-suffix-delete-popup',
    template: ''
})
export class TramiteAsociadoMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tramiteAsociadoPopupService: TramiteAsociadoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tramiteAsociadoPopupService
                .open(TramiteAsociadoMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
