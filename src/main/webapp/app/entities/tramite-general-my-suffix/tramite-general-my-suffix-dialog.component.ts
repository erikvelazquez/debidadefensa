import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TramiteGeneralMySuffix } from './tramite-general-my-suffix.model';
import { TramiteGeneralMySuffixPopupService } from './tramite-general-my-suffix-popup.service';
import { TramiteGeneralMySuffixService } from './tramite-general-my-suffix.service';
import { ClienteMySuffix, ClienteMySuffixService } from '../cliente-my-suffix';
import { EstatusMySuffix, EstatusMySuffixService } from '../estatus-my-suffix';
import { TramiteAsociadoMySuffix, TramiteAsociadoMySuffixService } from '../tramite-asociado-my-suffix';

@Component({
    selector: 'jhi-tramite-general-my-suffix-dialog',
    templateUrl: './tramite-general-my-suffix-dialog.component.html'
})
export class TramiteGeneralMySuffixDialogComponent implements OnInit {

    tramiteGeneral: TramiteGeneralMySuffix;
    isSaving: boolean;

    clientes: ClienteMySuffix[];

    estatustramitegenerals: EstatusMySuffix[];

    tramiteasociados: TramiteAsociadoMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tramiteGeneralService: TramiteGeneralMySuffixService,
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
            .query({filter: 'tramitegeneral-is-null'})
            .subscribe((res: HttpResponse<EstatusMySuffix[]>) => {
                if (!this.tramiteGeneral.estatusTramiteGeneralId) {
                    this.estatustramitegenerals = res.body;
                } else {
                    this.estatusService
                        .find(this.tramiteGeneral.estatusTramiteGeneralId)
                        .subscribe((subRes: HttpResponse<EstatusMySuffix>) => {
                            this.estatustramitegenerals = [subRes.body].concat(res.body);
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
        if (this.tramiteGeneral.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tramiteGeneralService.update(this.tramiteGeneral));
        } else {
            this.subscribeToSaveResponse(
                this.tramiteGeneralService.create(this.tramiteGeneral));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TramiteGeneralMySuffix>>) {
        result.subscribe((res: HttpResponse<TramiteGeneralMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TramiteGeneralMySuffix) {
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
    selector: 'jhi-tramite-general-my-suffix-popup',
    template: ''
})
export class TramiteGeneralMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tramiteGeneralPopupService: TramiteGeneralMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tramiteGeneralPopupService
                    .open(TramiteGeneralMySuffixDialogComponent as Component, params['id']);
            } else {
                this.tramiteGeneralPopupService
                    .open(TramiteGeneralMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
