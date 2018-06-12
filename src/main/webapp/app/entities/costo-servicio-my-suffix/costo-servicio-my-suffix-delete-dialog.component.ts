import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CostoServicioMySuffix } from './costo-servicio-my-suffix.model';
import { CostoServicioMySuffixPopupService } from './costo-servicio-my-suffix-popup.service';
import { CostoServicioMySuffixService } from './costo-servicio-my-suffix.service';

@Component({
    selector: 'jhi-costo-servicio-my-suffix-delete-dialog',
    templateUrl: './costo-servicio-my-suffix-delete-dialog.component.html'
})
export class CostoServicioMySuffixDeleteDialogComponent {

    costoServicio: CostoServicioMySuffix;

    constructor(
        private costoServicioService: CostoServicioMySuffixService,
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
    selector: 'jhi-costo-servicio-my-suffix-delete-popup',
    template: ''
})
export class CostoServicioMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costoServicioPopupService: CostoServicioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.costoServicioPopupService
                .open(CostoServicioMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
