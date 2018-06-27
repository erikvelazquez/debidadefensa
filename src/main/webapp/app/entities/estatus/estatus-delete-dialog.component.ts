import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Estatus } from './estatus.model';
import { EstatusPopupService } from './estatus-popup.service';
import { EstatusService } from './estatus.service';

@Component({
    selector: 'jhi-estatus-delete-dialog',
    templateUrl: './estatus-delete-dialog.component.html'
})
export class EstatusDeleteDialogComponent {

    estatus: Estatus;

    constructor(
        private estatusService: EstatusService,
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
    selector: 'jhi-estatus-delete-popup',
    template: ''
})
export class EstatusDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estatusPopupService: EstatusPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estatusPopupService
                .open(EstatusDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
