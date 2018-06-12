import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ExpedienteAsociadoMySuffix } from './expediente-asociado-my-suffix.model';
import { ExpedienteAsociadoMySuffixPopupService } from './expediente-asociado-my-suffix-popup.service';
import { ExpedienteAsociadoMySuffixService } from './expediente-asociado-my-suffix.service';
import { ExpedienteMySuffix, ExpedienteMySuffixService } from '../expediente-my-suffix';
import { EstatusMySuffix, EstatusMySuffixService } from '../estatus-my-suffix';

@Component({
    selector: 'jhi-expediente-asociado-my-suffix-dialog',
    templateUrl: './expediente-asociado-my-suffix-dialog.component.html'
})
export class ExpedienteAsociadoMySuffixDialogComponent implements OnInit {

    expedienteAsociado: ExpedienteAsociadoMySuffix;
    isSaving: boolean;

    expedientes: ExpedienteMySuffix[];

    estatusexpedienteasociados: EstatusMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private expedienteAsociadoService: ExpedienteAsociadoMySuffixService,
        private expedienteService: ExpedienteMySuffixService,
        private estatusService: EstatusMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.expedienteService.query()
            .subscribe((res: HttpResponse<ExpedienteMySuffix[]>) => { this.expedientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.estatusService
            .query({filter: 'expedienteasociado-is-null'})
            .subscribe((res: HttpResponse<EstatusMySuffix[]>) => {
                if (!this.expedienteAsociado.estatusExpedienteAsociadoId) {
                    this.estatusexpedienteasociados = res.body;
                } else {
                    this.estatusService
                        .find(this.expedienteAsociado.estatusExpedienteAsociadoId)
                        .subscribe((subRes: HttpResponse<EstatusMySuffix>) => {
                            this.estatusexpedienteasociados = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.expedienteAsociado.id !== undefined) {
            this.subscribeToSaveResponse(
                this.expedienteAsociadoService.update(this.expedienteAsociado));
        } else {
            this.subscribeToSaveResponse(
                this.expedienteAsociadoService.create(this.expedienteAsociado));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ExpedienteAsociadoMySuffix>>) {
        result.subscribe((res: HttpResponse<ExpedienteAsociadoMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ExpedienteAsociadoMySuffix) {
        this.eventManager.broadcast({ name: 'expedienteAsociadoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackExpedienteById(index: number, item: ExpedienteMySuffix) {
        return item.id;
    }

    trackEstatusById(index: number, item: EstatusMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-expediente-asociado-my-suffix-popup',
    template: ''
})
export class ExpedienteAsociadoMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private expedienteAsociadoPopupService: ExpedienteAsociadoMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.expedienteAsociadoPopupService
                    .open(ExpedienteAsociadoMySuffixDialogComponent as Component, params['id']);
            } else {
                this.expedienteAsociadoPopupService
                    .open(ExpedienteAsociadoMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
