import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteAsociadoMySuffix } from './tramite-asociado-my-suffix.model';
import { TramiteAsociadoMySuffixPopupService } from './tramite-asociado-my-suffix-popup.service';
import { TramiteAsociadoMySuffixService } from './tramite-asociado-my-suffix.service';

@Component({
    selector: 'jhi-tramite-asociado-my-suffix-dialog',
    templateUrl: './tramite-asociado-my-suffix-dialog.component.html'
})
export class TramiteAsociadoMySuffixDialogComponent implements OnInit {

    tramiteAsociado: TramiteAsociadoMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private tramiteAsociadoService: TramiteAsociadoMySuffixService,
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
        if (this.tramiteAsociado.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tramiteAsociadoService.update(this.tramiteAsociado));
        } else {
            this.subscribeToSaveResponse(
                this.tramiteAsociadoService.create(this.tramiteAsociado));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TramiteAsociadoMySuffix>>) {
        result.subscribe((res: HttpResponse<TramiteAsociadoMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TramiteAsociadoMySuffix) {
        this.eventManager.broadcast({ name: 'tramiteAsociadoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tramite-asociado-my-suffix-popup',
    template: ''
})
export class TramiteAsociadoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tramiteAsociadoPopupService: TramiteAsociadoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tramiteAsociadoPopupService
                    .open(TramiteAsociadoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.tramiteAsociadoPopupService
                    .open(TramiteAsociadoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
