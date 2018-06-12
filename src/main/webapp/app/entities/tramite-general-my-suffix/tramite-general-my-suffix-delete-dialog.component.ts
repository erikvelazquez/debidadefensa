import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteGeneralMySuffix } from './tramite-general-my-suffix.model';
import { TramiteGeneralMySuffixPopupService } from './tramite-general-my-suffix-popup.service';
import { TramiteGeneralMySuffixService } from './tramite-general-my-suffix.service';

@Component({
    selector: 'jhi-tramite-general-my-suffix-delete-dialog',
    templateUrl: './tramite-general-my-suffix-delete-dialog.component.html'
})
export class TramiteGeneralMySuffixDeleteDialogComponent {

    tramiteGeneral: TramiteGeneralMySuffix;

    constructor(
        private tramiteGeneralService: TramiteGeneralMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tramiteGeneralService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tramiteGeneralListModification',
                content: 'Deleted an tramiteGeneral'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tramite-general-my-suffix-delete-popup',
    template: ''
})
export class TramiteGeneralMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tramiteGeneralPopupService: TramiteGeneralMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tramiteGeneralPopupService
                .open(TramiteGeneralMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
