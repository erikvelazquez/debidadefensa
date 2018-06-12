import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClienteMySuffix } from './cliente-my-suffix.model';
import { ClienteMySuffixPopupService } from './cliente-my-suffix-popup.service';
import { ClienteMySuffixService } from './cliente-my-suffix.service';

@Component({
    selector: 'jhi-cliente-my-suffix-dialog',
    templateUrl: './cliente-my-suffix-dialog.component.html'
})
export class ClienteMySuffixDialogComponent implements OnInit {

    cliente: ClienteMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private clienteService: ClienteMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cliente.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clienteService.update(this.cliente));
        } else {
            this.subscribeToSaveResponse(
                this.clienteService.create(this.cliente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ClienteMySuffix>>) {
        result.subscribe((res: HttpResponse<ClienteMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ClienteMySuffix) {
        this.eventManager.broadcast({ name: 'clienteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cliente-my-suffix-popup',
    template: ''
})
export class ClienteMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientePopupService: ClienteMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clientePopupService
                    .open(ClienteMySuffixDialogComponent as Component, params['id']);
            } else {
                this.clientePopupService
                    .open(ClienteMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
