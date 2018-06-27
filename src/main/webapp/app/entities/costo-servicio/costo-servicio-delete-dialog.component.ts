import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CostoServicio } from './costo-servicio.model';
import { CostoServicioPopupService } from './costo-servicio-popup.service';
import { CostoServicioService } from './costo-servicio.service';

@Component({
    selector: 'jhi-costo-servicio-delete-dialog',
    templateUrl: './costo-servicio-delete-dialog.component.html'
})
export class CostoServicioDeleteDialogComponent {

    costoServicio: CostoServicio;

    constructor(
        private costoServicioService: CostoServicioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costoServicioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'costoServicioListModification',
                content: 'Deleted an costoServicio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-costo-servicio-delete-popup',
    template: ''
})
export class CostoServicioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costoServicioPopupService: CostoServicioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.costoServicioPopupService
                .open(CostoServicioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
