import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteMigratorio } from './tramite-migratorio.model';
import { TramiteMigratorioPopupService } from './tramite-migratorio-popup.service';
import { TramiteMigratorioService } from './tramite-migratorio.service';

@Component({
    selector: 'jhi-tramite-migratorio-delete-dialog',
    templateUrl: './tramite-migratorio-delete-dialog.component.html'
})
export class TramiteMigratorioDeleteDialogComponent {

    tramiteMigratorio: TramiteMigratorio;

    constructor(
        private tramiteMigratorioService: TramiteMigratorioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tramiteMigratorioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tramiteMigratorioListModification',
                content: 'Deleted an tramiteMigratorio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tramite-migratorio-delete-popup',
    template: ''
})
export class TramiteMigratorioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tramiteMigratorioPopupService: TramiteMigratorioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tramiteMigratorioPopupService
                .open(TramiteMigratorioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
