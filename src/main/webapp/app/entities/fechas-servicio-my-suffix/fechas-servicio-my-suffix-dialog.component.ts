import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FechasServicioMySuffix } from './fechas-servicio-my-suffix.model';
import { FechasServicioMySuffixPopupService } from './fechas-servicio-my-suffix-popup.service';
import { FechasServicioMySuffixService } from './fechas-servicio-my-suffix.service';
import { ExpedienteMySuffix, ExpedienteMySuffixService } from '../expediente-my-suffix';
import { TramiteMigratorioMySuffix, TramiteMigratorioMySuffixService } from '../tramite-migratorio-my-suffix';
import { TramiteGeneralMySuffix, TramiteGeneralMySuffixService } from '../tramite-general-my-suffix';
import { TipoServicioMySuffix, TipoServicioMySuffixService } from '../tipo-servicio-my-suffix';

@Component({
    selector: 'jhi-fechas-servicio-my-suffix-dialog',
    templateUrl: './fechas-servicio-my-suffix-dialog.component.html'
})
export class FechasServicioMySuffixDialogComponent implements OnInit {

    fechasServicio: FechasServicioMySuffix;
    isSaving: boolean;

    expedientes: ExpedienteMySuffix[];

    tramitemigratorios: TramiteMigratorioMySuffix[];

    tramitegenerals: TramiteGeneralMySuffix[];

    tiposerviciofechas: TipoServicioMySuffix[];
    horaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private fechasServicioService: FechasServicioMySuffixService,
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
            .query({filter: 'fechasservicio-is-null'})
            .subscribe((res: HttpResponse<TipoServicioMySuffix[]>) => {
                if (!this.fechasServicio.tipoServicioFechasId) {
                    this.tiposerviciofechas = res.body;
                } else {
                    this.tipoServicioService
                        .find(this.fechasServicio.tipoServicioFechasId)
                        .subscribe((subRes: HttpResponse<TipoServicioMySuffix>) => {
                            this.tiposerviciofechas = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.fechasServicio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fechasServicioService.update(this.fechasServicio));
        } else {
            this.subscribeToSaveResponse(
                this.fechasServicioService.create(this.fechasServicio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FechasServicioMySuffix>>) {
        result.subscribe((res: HttpResponse<FechasServicioMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FechasServicioMySuffix) {
        this.eventManager.broadcast({ name: 'fechasServicioListModification', content: 'OK'});
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
    selector: 'jhi-fechas-servicio-my-suffix-popup',
    template: ''
})
export class FechasServicioMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fechasServicioPopupService: FechasServicioMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fechasServicioPopupService
                    .open(FechasServicioMySuffixDialogComponent as Component, params['id']);
            } else {
                this.fechasServicioPopupService
                    .open(FechasServicioMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
