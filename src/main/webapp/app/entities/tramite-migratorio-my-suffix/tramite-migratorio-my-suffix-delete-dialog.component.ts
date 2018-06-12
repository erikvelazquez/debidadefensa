import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteMigratorioMySuffix } from './tramite-migratorio-my-suffix.model';
import { TramiteMigratorioMySuffixPopupService } from './tramite-migratorio-my-suffix-popup.service';
import { TramiteMigratorioMySuffixService } from './tramite-migratorio-my-suffix.service';

@Component({
    selector: 'jhi-tramite-migratorio-my-suffix-delete-dialog',
    templateUrl: './tramite-migratorio-my-suffix-delete-dialog.component.html'
})
export class TramiteMigratorioMySuffixDeleteDialogComponent {

    tramiteMigratorio: TramiteMigratorioMySuffix;

    constructor(
        private tramiteMigratorioService: TramiteMigratorioMySuffixService,
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
    selector: 'jhi-tramite-migratorio-my-suffix-delete-popup',
    template: ''
})
export class TramiteMigratorioMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tramiteMigratorioPopupService: TramiteMigratorioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tramiteMigratorioPopupService
                .open(TramiteMigratorioMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
