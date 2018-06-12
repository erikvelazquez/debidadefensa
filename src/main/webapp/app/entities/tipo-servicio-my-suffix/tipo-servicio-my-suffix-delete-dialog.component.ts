import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoServicioMySuffix } from './tipo-servicio-my-suffix.model';
import { TipoServicioMySuffixPopupService } from './tipo-servicio-my-suffix-popup.service';
import { TipoServicioMySuffixService } from './tipo-servicio-my-suffix.service';

@Component({
    selector: 'jhi-tipo-servicio-my-suffix-delete-dialog',
    templateUrl: './tipo-servicio-my-suffix-delete-dialog.component.html'
})
export class TipoServicioMySuffixDeleteDialogComponent {

    tipoServicio: TipoServicioMySuffix;

    constructor(
        private tipoServicioService: TipoServicioMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoServicioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoServicioListModification',
                content: 'Deleted an tipoServicio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-servicio-my-suffix-delete-popup',
    template: ''
})
export class TipoServicioMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoServicioPopupService: TipoServicioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoServicioPopupService
                .open(TipoServicioMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
