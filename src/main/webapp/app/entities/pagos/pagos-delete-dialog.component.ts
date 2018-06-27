import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pagos } from './pagos.model';
import { PagosPopupService } from './pagos-popup.service';
import { PagosService } from './pagos.service';

@Component({
    selector: 'jhi-pagos-delete-dialog',
    templateUrl: './pagos-delete-dialog.component.html'
})
export class PagosDeleteDialogComponent {

    pagos: Pagos;

    constructor(
        private pagosService: PagosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pagosService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pagosListModification',
                content: 'Deleted an pagos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pagos-delete-popup',
    template: ''
})
export class PagosDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagosPopupService: PagosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pagosPopupService
                .open(PagosDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
