import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TramiteMigratorioMySuffix } from './tramite-migratorio-my-suffix.model';
import { TramiteMigratorioMySuffixPopupService } from './tramite-migratorio-my-suffix-popup.service';
import { TramiteMigratorioMySuffixService } from './tramite-migratorio-my-suffix.service';
import { ClienteMySuffix, ClienteMySuffixService } from '../cliente-my-suffix';
import { EstatusMySuffix, EstatusMySuffixService } from '../estatus-my-suffix';
import { TramiteAsociadoMySuffix, TramiteAsociadoMySuffixService } from '../tramite-asociado-my-suffix';

@Component({
    selector: 'jhi-tramite-migratorio-my-suffix-dialog',
    templateUrl: './tramite-migratorio-my-suffix-dialog.component.html'
})
export class TramiteMigratorioMySuffixDialogComponent implements OnInit {

    tramiteMigratorio: TramiteMigratorioMySuffix;
    isSaving: boolean;

    clientes: ClienteMySuffix[];

    estatustramitemigratorios: EstatusMySuffix[];

    tramiteasociados: TramiteAsociadoMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tramiteMigratorioService: TramiteMigratorioMySuffixService,
        private clienteService: ClienteMySuffixService,
        private estatusService: EstatusMySuffixService,
        private tramiteAsociadoService: TramiteAsociadoMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clienteService.query()
            .subscribe((res: HttpResponse<ClienteMySuffix[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.estatusService
            .query({filter: 'tramitemigratorio-is-null'})
            .subscribe((res: HttpResponse<EstatusMySuffix[]>) => {
                if (!this.tramiteMigratorio.estatusTramiteMigratorioId) {
                    this.estatustramitemigratorios = res.body;
                } else {
                    this.estatusService
                        .find(this.tramiteMigratorio.estatusTramiteMigratorioId)
                        .subscribe((subRes: HttpResponse<EstatusMySuffix>) => {
                            this.estatustramitemigratorios = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tramiteAsociadoService.query()
            .subscribe((res: HttpResponse<TramiteAsociadoMySuffix[]>) => { this.tramiteasociados = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<TramiteMigratorioMySuffix>>) {
        result.subscribe((res: HttpResponse<TramiteMigratorioMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TramiteMigratorioMySuffix) {
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

    trackClienteById(index: number, item: ClienteMySuffix) {
        return item.id;
    }

    trackEstatusById(index: number, item: EstatusMySuffix) {
        return item.id;
    }

    trackTramiteAsociadoById(index: number, item: TramiteAsociadoMySuffix) {
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
    selector: 'jhi-tramite-migratorio-my-suffix-popup',
    template: ''
})
export class TramiteMigratorioMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tramiteMigratorioPopupService: TramiteMigratorioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tramiteMigratorioPopupService
                    .open(TramiteMigratorioMySuffixDialogComponent as Component, params['id']);
            } else {
                this.tramiteMigratorioPopupService
                    .open(TramiteMigratorioMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
