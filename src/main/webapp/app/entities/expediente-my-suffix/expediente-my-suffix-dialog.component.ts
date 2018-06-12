import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ExpedienteMySuffix } from './expediente-my-suffix.model';
import { ExpedienteMySuffixPopupService } from './expediente-my-suffix-popup.service';
import { ExpedienteMySuffixService } from './expediente-my-suffix.service';
import { ClienteMySuffix, ClienteMySuffixService } from '../cliente-my-suffix';
import { TipoServicioMySuffix, TipoServicioMySuffixService } from '../tipo-servicio-my-suffix';
import { EstatusMySuffix, EstatusMySuffixService } from '../estatus-my-suffix';

@Component({
    selector: 'jhi-expediente-my-suffix-dialog',
    templateUrl: './expediente-my-suffix-dialog.component.html'
})
export class ExpedienteMySuffixDialogComponent implements OnInit {

    expediente: ExpedienteMySuffix;
    isSaving: boolean;

    clientes: ClienteMySuffix[];

    tiposervicioexpedientes: TipoServicioMySuffix[];

    estatusexpedientes: EstatusMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private expedienteService: ExpedienteMySuffixService,
        private clienteService: ClienteMySuffixService,
        private tipoServicioService: TipoServicioMySuffixService,
        private estatusService: EstatusMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clienteService.query()
            .subscribe((res: HttpResponse<ClienteMySuffix[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tipoServicioService
            .query({filter: 'expediente-is-null'})
            .subscribe((res: HttpResponse<TipoServicioMySuffix[]>) => {
                if (!this.expediente.tipoServicioExpedienteId) {
                    this.tiposervicioexpedientes = res.body;
                } else {
                    this.tipoServicioService
                        .find(this.expediente.tipoServicioExpedienteId)
                        .subscribe((subRes: HttpResponse<TipoServicioMySuffix>) => {
                            this.tiposervicioexpedientes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.estatusService
            .query({filter: 'expediente-is-null'})
            .subscribe((res: HttpResponse<EstatusMySuffix[]>) => {
                if (!this.expediente.estatusExpedienteId) {
                    this.estatusexpedientes = res.body;
                } else {
                    this.estatusService
                        .find(this.expediente.estatusExpedienteId)
                        .subscribe((subRes: HttpResponse<EstatusMySuffix>) => {
                            this.estatusexpedientes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.expediente.id !== undefined) {
            this.subscribeToSaveResponse(
                this.expedienteService.update(this.expediente));
        } else {
            this.subscribeToSaveResponse(
                this.expedienteService.create(this.expediente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ExpedienteMySuffix>>) {
        result.subscribe((res: HttpResponse<ExpedienteMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ExpedienteMySuffix) {
        this.eventManager.broadcast({ name: 'expedienteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClienteById(index: number, item: ClienteMySuffix) {
        return item.id;
    }

    trackTipoServicioById(index: number, item: TipoServicioMySuffix) {
        return item.id;
    }

    trackEstatusById(index: number, item: EstatusMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-expediente-my-suffix-popup',
    template: ''
})
export class ExpedienteMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private expedientePopupService: ExpedienteMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.expedientePopupService
                    .open(ExpedienteMySuffixDialogComponent as Component, params['id']);
            } else {
                this.expedientePopupService
                    .open(ExpedienteMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
