import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FechasServicio } from './fechas-servicio.model';
import { FechasServicioPopupService } from './fechas-servicio-popup.service';
import { FechasServicioService } from './fechas-servicio.service';

@Component({
    selector: 'jhi-fechas-servicio-delete-dialog',
    templateUrl: './fechas-servicio-delete-dialog.component.html'
})
export class FechasServicioDeleteDialogComponent {

    fechasServicio: FechasServicio;

    constructor(
        private fechasServicioService: FechasServicioService,
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
                name: 'tramiteMigratorioListModification',
                content: 'Deleted an fechasServicio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-fechas-servicio-delete-popup',
    template: ''
})
export class FechasServicioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fechasServicioPopupService: FechasServicioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fechasServicioPopupService
                .open(FechasServicioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
