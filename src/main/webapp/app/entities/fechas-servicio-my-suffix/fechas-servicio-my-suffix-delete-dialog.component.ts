import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FechasServicioMySuffix } from './fechas-servicio-my-suffix.model';
import { FechasServicioMySuffixPopupService } from './fechas-servicio-my-suffix-popup.service';
import { FechasServicioMySuffixService } from './fechas-servicio-my-suffix.service';

@Component({
    selector: 'jhi-fechas-servicio-my-suffix-delete-dialog',
    templateUrl: './fechas-servicio-my-suffix-delete-dialog.component.html'
})
export class FechasServicioMySuffixDeleteDialogComponent {

    fechasServicio: FechasServicioMySuffix;

    constructor(
        private fechasServicioService: FechasServicioMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.fechasServicioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'fechasServicioListModification',
                content: 'Deleted an fechasServicio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fechas-servicio-my-suffix-delete-popup',
    template: ''
})
export class FechasServicioMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fechasServicioPopupService: FechasServicioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fechasServicioPopupService
                .open(FechasServicioMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
