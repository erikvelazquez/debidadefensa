import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TramiteMigratorio } from './tramite-migratorio.model';
import { TramiteMigratorioPopupService } from './tramite-migratorio-popup.service';
import { TramiteMigratorioService } from './tramite-migratorio.service';
import { Cliente, ClienteService } from '../cliente';
import { Estatus, EstatusService } from '../estatus';
import { TramiteAsociado, TramiteAsociadoService } from '../tramite-asociado';

@Component({
    selector: 'jhi-tramite-migratorio-dialog',
    templateUrl: './tramite-migratorio-dialog.component.html',
    styleUrls: [
        '../../app.scss'
    ]
})
export class TramiteMigratorioDialogComponent implements OnInit {

    tramiteMigratorio: TramiteMigratorio;
    isSaving: boolean;

    clientes: Cliente[];

    estatustramitemigratorios: Estatus[];

    tramiteasociados: TramiteAsociado[];
    fechaIngresoDp: any;
    fechaNotificacionDp: any;
    fechaResolucionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tramiteMigratorioService: TramiteMigratorioService,
        private clienteService: ClienteService,
        private estatusService: EstatusService,
        private tramiteAsociadoService: TramiteAsociadoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clienteService.query()
            .subscribe((res: HttpResponse<Cliente[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.estatusService
            .query({filter: 'tramitemigratorio-is-null'})
            .subscribe((res: HttpResponse<Estatus[]>) => {
                if (!this.tramiteMigratorio.estatusTramiteMigratorioId) {
                    this.estatustramitemigratorios = res.body;
                    this.estatustramitemigratorios = this.estatustramitemigratorios.filter((s) => {
                        return s.tipoServicioId === 1002;
                    });
                    
                } else {
                    this.estatusService
                        .find(this.tramiteMigratorio.estatusTramiteMigratorioId)
                        .subscribe((subRes: HttpResponse<Estatus>) => {
                           // this.estatustramitemigratorios = [subRes.body].concat(res.body);
                           this.estatustramitemigratorios = res.body;
                            this.estatustramitemigratorios = this.estatustramitemigratorios.filter((s) => {
                                return s.tipoServicioId === 1002;
                            });
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tramiteAsociadoService.query()
            .subscribe((res: HttpResponse<TramiteAsociado[]>) => { this.tramiteasociados = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tramiteMigratorio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tramiteMigratorioService.update(this.tramiteMigratorio));
        } else {
            this.subscribeToSaveResponse(
                this.tramiteMigratorioService.create(this.tramiteMigratorio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TramiteMigratorio>>) {
        result.subscribe((res: HttpResponse<TramiteMigratorio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TramiteMigratorio) {
        this.eventManager.broadcast({ name: 'tramiteMigratorioListModification', content: 'OK'});
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

    trackTramiteAsociadoById(index: number, item: TramiteAsociado) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-tramite-migratorio-popup',
    template: ''
})
export class TramiteMigratorioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tramiteMigratorioPopupService: TramiteMigratorioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tramiteMigratorioPopupService
                    .open(TramiteMigratorioDialogComponent as Component, params['id']);
            } else {
                this.tramiteMigratorioPopupService
                    .open(TramiteMigratorioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
