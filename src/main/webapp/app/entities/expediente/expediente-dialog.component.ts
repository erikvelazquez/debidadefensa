import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Expediente } from './expediente.model';
import { ExpedientePopupService } from './expediente-popup.service';
import { ExpedienteService } from './expediente.service';
import { Cliente, ClienteService } from '../cliente';
import { TipoServicio, TipoServicioService } from '../tipo-servicio';
import { Estatus, EstatusService } from '../estatus';

@Component({
    selector: 'jhi-expediente-dialog',
    templateUrl: './expediente-dialog.component.html',
    styleUrls: [
        '../../app.scss'
    ]
})
export class ExpedienteDialogComponent implements OnInit {

    expediente: Expediente;
    isSaving: boolean;

    clientes: Cliente[];

    tiposervicioexpedientes: TipoServicio[];

    estatusexpedientes: Estatus[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private expedienteService: ExpedienteService,
        private clienteService: ClienteService,
        private tipoServicioService: TipoServicioService,
        private estatusService: EstatusService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clienteService.query()
            .subscribe((res: HttpResponse<Cliente[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tipoServicioService
            .query({filter: 'expediente-is-null'})
            .subscribe((res: HttpResponse<TipoServicio[]>) => {
                if (!this.expediente.tipoServicioExpedienteId) {
                    this.tiposervicioexpedientes = res.body;
                } else {
                    this.tipoServicioService
                        .find(this.expediente.tipoServicioExpedienteId)
                        .subscribe((subRes: HttpResponse<TipoServicio>) => {
                            this.tiposervicioexpedientes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.estatusService
            .query({filter: 'expediente-is-null'})
            .subscribe((res: HttpResponse<Estatus[]>) => {
                if (!this.expediente.estatusExpedienteId) {
                    this.estatusexpedientes = res.body;
                } else {
                    this.estatusService
                        .find(this.expediente.estatusExpedienteId)
                        .subscribe((subRes: HttpResponse<Estatus>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<Expediente>>) {
        result.subscribe((res: HttpResponse<Expediente>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Expediente) {
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

    trackClienteById(index: number, item: Cliente) {
        return item.id;
    }

    trackTipoServicioById(index: number, item: TipoServicio) {
        return item.id;
    }

    trackEstatusById(index: number, item: Estatus) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-expediente-popup',
    template: ''
})
export class ExpedientePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private expedientePopupService: ExpedientePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.expedientePopupService
                    .open(ExpedienteDialogComponent as Component, params['id']);
            } else {
                this.expedientePopupService
                    .open(ExpedienteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
