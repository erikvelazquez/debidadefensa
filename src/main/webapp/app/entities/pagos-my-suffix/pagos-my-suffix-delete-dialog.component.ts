import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PagosMySuffix } from './pagos-my-suffix.model';
import { PagosMySuffixPopupService } from './pagos-my-suffix-popup.service';
import { PagosMySuffixService } from './pagos-my-suffix.service';

@Component({
    selector: 'jhi-pagos-my-suffix-delete-dialog',
    templateUrl: './pagos-my-suffix-delete-dialog.component.html'
})
export class PagosMySuffixDeleteDialogComponent {

    pagos: PagosMySuffix;

    constructor(
        private pagosService: PagosMySuffixService,
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
    selector: 'jhi-pagos-my-suffix-delete-popup',
    template: ''
})
export class PagosMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagosPopupService: PagosMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pagosPopupService
                .open(PagosMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
