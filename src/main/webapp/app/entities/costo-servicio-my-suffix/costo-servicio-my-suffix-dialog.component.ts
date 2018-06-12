import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CostoServicioMySuffix } from './costo-servicio-my-suffix.model';
import { CostoServicioMySuffixPopupService } from './costo-servicio-my-suffix-popup.service';
import { CostoServicioMySuffixService } from './costo-servicio-my-suffix.service';
import { ExpedienteMySuffix, ExpedienteMySuffixService } from '../expediente-my-suffix';
import { TramiteMigratorioMySuffix, TramiteMigratorioMySuffixService } from '../tramite-migratorio-my-suffix';
import { TramiteGeneralMySuffix, TramiteGeneralMySuffixService } from '../tramite-general-my-suffix';
import { TipoServicioMySuffix, TipoServicioMySuffixService } from '../tipo-servicio-my-suffix';

@Component({
    selector: 'jhi-costo-servicio-my-suffix-dialog',
    templateUrl: './costo-servicio-my-suffix-dialog.component.html'
})
export class CostoServicioMySuffixDialogComponent implements OnInit {

    costoServicio: CostoServicioMySuffix;
    isSaving: boolean;

    expedientes: ExpedienteMySuffix[];

    tramitemigratorios: TramiteMigratorioMySuffix[];

    tramitegenerals: TramiteGeneralMySuffix[];

    tiposerviciocostoservicios: TipoServicioMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private costoServicioService: CostoServicioMySuffixService,
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
            .query({filter: 'costoservicio-is-null'})
            .subscribe((res: HttpResponse<TipoServicioMySuffix[]>) => {
                if (!this.costoServicio.tipoServicioCostoServicioId) {
                    this.tiposerviciocostoservicios = res.body;
                } else {
                    this.tipoServicioService
                        .find(this.costoServicio.tipoServicioCostoServicioId)
                        .subscribe((subRes: HttpResponse<TipoServicioMySuffix>) => {
                            this.tiposerviciocostoservicios = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.costoServicio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costoServicioService.update(this.costoServicio));
        } else {
            this.subscribeToSaveResponse(
                this.costoServicioService.create(this.costoServicio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CostoServicioMySuffix>>) {
        result.subscribe((res: HttpResponse<CostoServicioMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CostoServicioMySuffix) {
        this.eventManager.broadcast({ name: 'costoServicioListModification', content: 'OK'});
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
    selector: 'jhi-costo-servicio-my-suffix-popup',
    template: ''
})
export class CostoServicioMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costoServicioPopupService: CostoServicioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.costoServicioPopupService
                    .open(CostoServicioMySuffixDialogComponent as Component, params['id']);
            } else {
                this.costoServicioPopupService
                    .open(CostoServicioMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
