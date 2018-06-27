import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TramiteGeneral } from './tramite-general.model';
import { TramiteGeneralPopupService } from './tramite-general-popup.service';
import { TramiteGeneralService } from './tramite-general.service';
import { Cliente, ClienteService } from '../cliente';
import { Estatus, EstatusService } from '../estatus';
import { TramiteAsociado, TramiteAsociadoService } from '../tramite-asociado';

@Component({
    selector: 'jhi-tramite-general-dialog',
    templateUrl: './tramite-general-dialog.component.html'
})
export class TramiteGeneralDialogComponent implements OnInit {

    tramiteGeneral: TramiteGeneral;
    isSaving: boolean;

    clientes: Cliente[];

    estatustramitegenerals: Estatus[];

    tramiteasociados: TramiteAsociado[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tramiteGeneralService: TramiteGeneralService,
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
            .query({filter: 'tramitegeneral-is-null'})
            .subscribe((res: HttpResponse<Estatus[]>) => {
                if (!this.tramiteGeneral.estatusTramiteGeneralId) {
                    this.estatustramitegenerals = res.body;
                } else {
                    this.estatusService
                        .find(this.tramiteGeneral.estatusTramiteGeneralId)
                        .subscribe((subRes: HttpResponse<Estatus>) => {
                            this.estatustramitegenerals = [subRes.body].concat(res.body);
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
        if (this.tramiteGeneral.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tramiteGeneralService.update(this.tramiteGeneral));
        } else {
            this.subscribeToSaveResponse(
                this.tramiteGeneralService.create(this.tramiteGeneral));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TramiteGeneral>>) {
        result.subscribe((res: HttpResponse<TramiteGeneral>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TramiteGeneral) {
        this.eventManager.broadcast({ name: 'tramiteGeneralListModification', content: 'OK'});
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
    selector: 'jhi-tramite-general-popup',
    template: ''
})
export class TramiteGeneralPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tramiteGeneralPopupService: TramiteGeneralPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tramiteGeneralPopupService
                    .open(TramiteGeneralDialogComponent as Component, params['id']);
            } else {
                this.tramiteGeneralPopupService
                    .open(TramiteGeneralDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
