import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PagosMySuffix } from './pagos-my-suffix.model';
import { PagosMySuffixPopupService } from './pagos-my-suffix-popup.service';
import { PagosMySuffixService } from './pagos-my-suffix.service';
import { ExpedienteMySuffix, ExpedienteMySuffixService } from '../expediente-my-suffix';
import { TramiteMigratorioMySuffix, TramiteMigratorioMySuffixService } from '../tramite-migratorio-my-suffix';
import { TramiteGeneralMySuffix, TramiteGeneralMySuffixService } from '../tramite-general-my-suffix';
import { TipoServicioMySuffix, TipoServicioMySuffixService } from '../tipo-servicio-my-suffix';

@Component({
    selector: 'jhi-pagos-my-suffix-dialog',
    templateUrl: './pagos-my-suffix-dialog.component.html'
})
export class PagosMySuffixDialogComponent implements OnInit {

    pagos: PagosMySuffix;
    isSaving: boolean;

    expedientes: ExpedienteMySuffix[];

    tramitemigratorios: TramiteMigratorioMySuffix[];

    tramitegenerals: TramiteGeneralMySuffix[];

    tiposerviciopagos: TipoServicioMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pagosService: PagosMySuffixService,
        private expedienteService: ExpedienteMySuffixService,
        private tramiteMigratorioService: TramiteMigratorioMySuffixService,
        private tramiteGeneralService: TramiteGeneralMySuffixService,
        private tipoServicioService: TipoServicioMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.expedienteService.query()
            .subscribe((res: HttpResponse<ExpedienteMySuffix[]>) => { this.expedientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tramiteMigratorioService.query()
            .subscribe((res: HttpResponse<TramiteMigratorioMySuffix[]>) => { this.tramitemigratorios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tramiteGeneralService.query()
            .subscribe((res: HttpResponse<TramiteGeneralMySuffix[]>) => { this.tramitegenerals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tipoServicioService
            .query({filter: 'pagos-is-null'})
            .subscribe((res: HttpResponse<TipoServicioMySuffix[]>) => {
                if (!this.pagos.tipoServicioPagosId) {
                    this.tiposerviciopagos = res.body;
                } else {
                    this.tipoServicioService
                        .find(this.pagos.tipoServicioPagosId)
                        .subscribe((subRes: HttpResponse<TipoServicioMySuffix>) => {
                            this.tiposerviciopagos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pagos.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pagosService.update(this.pagos));
        } else {
            this.subscribeToSaveResponse(
                this.pagosService.create(this.pagos));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<PagosMySuffix>>) {
        result.subscribe((res: HttpResponse<PagosMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: PagosMySuffix) {
        this.eventManager.broadcast({ name: 'pagosListModification', content: 'OK'});
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

    trackTramiteMigratorioById(index: number, item: TramiteMigratorioMySuffix) {
        return item.id;
    }

    trackTramiteGeneralById(index: number, item: TramiteGeneralMySuffix) {
        return item.id;
    }

    trackTipoServicioById(index: number, item: TipoServicioMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pagos-my-suffix-popup',
    template: ''
})
export class PagosMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagosPopupService: PagosMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pagosPopupService
                    .open(PagosMySuffixDialogComponent as Component, params['id']);
            } else {
                this.pagosPopupService
                    .open(PagosMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
