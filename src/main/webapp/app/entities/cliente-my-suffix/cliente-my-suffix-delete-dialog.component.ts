import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClienteMySuffix } from './cliente-my-suffix.model';
import { ClienteMySuffixPopupService } from './cliente-my-suffix-popup.service';
import { ClienteMySuffixService } from './cliente-my-suffix.service';

@Component({
    selector: 'jhi-cliente-my-suffix-delete-dialog',
    templateUrl: './cliente-my-suffix-delete-dialog.component.html'
})
export class ClienteMySuffixDeleteDialogComponent {

    cliente: ClienteMySuffix;

    constructor(
        private clienteService: ClienteMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clienteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'clienteListModification',
                content: 'Deleted an cliente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cliente-my-suffix-delete-popup',
    template: ''
})
export class ClienteMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientePopupService: ClienteMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.clientePopupService
                .open(ClienteMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
