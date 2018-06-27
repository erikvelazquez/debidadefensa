import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoServicio } from './tipo-servicio.model';
import { TipoServicioPopupService } from './tipo-servicio-popup.service';
import { TipoServicioService } from './tipo-servicio.service';

@Component({
    selector: 'jhi-tipo-servicio-delete-dialog',
    templateUrl: './tipo-servicio-delete-dialog.component.html'
})
export class TipoServicioDeleteDialogComponent {

    tipoServicio: TipoServicio;

    constructor(
        private tipoServicioService: TipoServicioService,
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
    selector: 'jhi-tipo-servicio-delete-popup',
    template: ''
})
export class TipoServicioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoServicioPopupService: TipoServicioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoServicioPopupService
                .open(TipoServicioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
