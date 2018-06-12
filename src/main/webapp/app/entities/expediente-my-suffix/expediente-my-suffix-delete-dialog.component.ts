import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExpedienteMySuffix } from './expediente-my-suffix.model';
import { ExpedienteMySuffixPopupService } from './expediente-my-suffix-popup.service';
import { ExpedienteMySuffixService } from './expediente-my-suffix.service';

@Component({
    selector: 'jhi-expediente-my-suffix-delete-dialog',
    templateUrl: './expediente-my-suffix-delete-dialog.component.html'
})
export class ExpedienteMySuffixDeleteDialogComponent {

    expediente: ExpedienteMySuffix;

    constructor(
        private expedienteService: ExpedienteMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.expedienteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'expedienteListModification',
                content: 'Deleted an expediente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-expediente-my-suffix-delete-popup',
    template: ''
})
export class ExpedienteMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private expedientePopupService: ExpedienteMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.expedientePopupService
                .open(ExpedienteMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
