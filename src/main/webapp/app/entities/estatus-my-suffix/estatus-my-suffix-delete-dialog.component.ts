import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EstatusMySuffix } from './estatus-my-suffix.model';
import { EstatusMySuffixPopupService } from './estatus-my-suffix-popup.service';
import { EstatusMySuffixService } from './estatus-my-suffix.service';

@Component({
    selector: 'jhi-estatus-my-suffix-delete-dialog',
    templateUrl: './estatus-my-suffix-delete-dialog.component.html'
})
export class EstatusMySuffixDeleteDialogComponent {

    estatus: EstatusMySuffix;

    constructor(
        private estatusService: EstatusMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estatusService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estatusListModification',
                content: 'Deleted an estatus'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estatus-my-suffix-delete-popup',
    template: ''
})
export class EstatusMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estatusPopupService: EstatusMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estatusPopupService
                .open(EstatusMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
