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
import { Estatus, EstatusService } from '../estatus';
import { TipoServicio, TipoServicioService } from '../tipo-servicio';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../../services/fecha.service';

@Component({
    selector: 'jhi-expediente-dialog',
    templateUrl: './expediente-dialog.component.html',
    styleUrls: [
        '../../app.scss'
    ],
    providers: [{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class ExpedienteDialogComponent implements OnInit {

    expediente: Expediente;
    isSaving: boolean;

    clientes: Cliente[];

    estatusexpedientes: Estatus[];

    tiposervicios: TipoServicio[];
    fechaAltaDp: any;
    fechaSentenciaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private expedienteService: ExpedienteService,
        private clienteService: ClienteService,
        private estatusService: EstatusService,
        private tipoServicioService: TipoServicioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clienteService.query()
            .subscribe((res: HttpResponse<Cliente[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.estatusService
            .query({filter: 'expediente-is-null'})
            .subscribe((res: HttpResponse<Estatus[]>) => {
                if (!this.expediente.estatusExpedienteId) {
                    this.estatusexpedientes = res.body;
                    this.estatusexpedientes = this.estatusexpedientes.filter((s) => {
                                                    return s.tipoServicioId === 1001;
                                                });
                } else {
                    this.estatusService
                        .find(this.expediente.estatusExpedienteId)
                        .subscribe((subRes: HttpResponse<Estatus>) => {
                            this.estatusexpedientes = res.body; // [subRes.body].concat(res.body);
                            this.estatusexpedientes = this.estatusexpedientes.filter((s) => {
                                return s.tipoServicioId === 1001;
                            });
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tipoServicioService.query()
            .subscribe((res: HttpResponse<TipoServicio[]>) => { this.tiposervicios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.expediente.tipoServicioId = 1001;
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
        this.eventManager.broadcast({ name: 'expedienteListMainModification', content: 'OK'});
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

    trackEstatusById(index: number, item: Estatus) {
        return item.id;
    }

    trackTipoServicioById(index: number, item: TipoServicio) {
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
                    .open(ExpedienteDialogComponent as Component, params['idCliente'], params['id']);
            } else {
                this.expedientePopupService
                    .open(ExpedienteDialogComponent as Component, params['idCliente']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
