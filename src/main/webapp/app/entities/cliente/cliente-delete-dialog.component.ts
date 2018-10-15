import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Cliente } from './cliente.model';
import { ClientePopupService } from './cliente-popup.service';
import { ClienteService } from './cliente.service';

@Component({
    selector: 'jhi-cliente-delete-dialog',
    templateUrl: './cliente-delete-dialog.component.html'
})
export class ClienteDeleteDialogComponent {

    cliente: Cliente;

    constructor(
        private clienteService: ClienteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
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
        }, (res: HttpErrorResponse) => this.onError('debidadefensaApp.cliente.erroreliminar'));
    }

    private onError(error) {
        this.jhiAlertService.error(error, null, null);
        setTimeout(() => {
            this.activeModal.dismiss(true);
        }, 5000);
    }
}

@Component({
    selector: 'jhi-cliente-delete-popup',
    template: ''
})
export class ClienteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientePopupService: ClientePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.clientePopupService
                .open(ClienteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
