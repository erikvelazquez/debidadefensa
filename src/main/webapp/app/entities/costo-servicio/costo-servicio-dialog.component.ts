import { Component, OnInit, OnDestroy, Directive, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CostoServicio } from './costo-servicio.model';
import { CostoServicioPopupService } from './costo-servicio-popup.service';
import { CostoServicioService } from './costo-servicio.service';
import { Expediente, ExpedienteService } from '../expediente';
import { TramiteMigratorio, TramiteMigratorioService } from '../tramite-migratorio';
import { TramiteGeneral, TramiteGeneralService } from '../tramite-general';
import { TipoServicio, TipoServicioService } from '../tipo-servicio';
import { NgModel } from '@angular/forms';

@Component({
    selector: 'jhi-costo-servicio-dialog',
    templateUrl: './costo-servicio-dialog.component.html',
    styleUrls: [
        '../../app.scss'
    ]
})
export class CostoServicioDialogComponent implements OnInit {

    costoServicio: CostoServicio;
    isSaving: boolean;

    expedientes: Expediente[];

    tramitemigratorios: TramiteMigratorio[];

    tramitegenerals: TramiteGeneral[];

    tiposervicios: TipoServicio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private costoServicioService: CostoServicioService,
        private expedienteService: ExpedienteService,
        private tramiteMigratorioService: TramiteMigratorioService,
        private tramiteGeneralService: TramiteGeneralService,
        private tipoServicioService: TipoServicioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.expedienteService.query()
            .subscribe((res: HttpResponse<Expediente[]>) => { this.expedientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tramiteMigratorioService.query()
            .subscribe((res: HttpResponse<TramiteMigratorio[]>) => { this.tramitemigratorios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tramiteGeneralService.query()
            .subscribe((res: HttpResponse<TramiteGeneral[]>) => { this.tramitegenerals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tipoServicioService.query()
            .subscribe((res: HttpResponse<TipoServicio[]>) => { this.tiposervicios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<CostoServicio>>) {
        result.subscribe((res: HttpResponse<CostoServicio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CostoServicio) {
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

    trackExpedienteById(index: number, item: Expediente) {
        return item.id;
    }

    trackTramiteMigratorioById(index: number, item: TramiteMigratorio) {
        return item.id;
    }

    trackTramiteGeneralById(index: number, item: TramiteGeneral) {
        return item.id;
    }

    trackTipoServicioById(index: number, item: TipoServicio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-costo-servicio-popup',
    template: ''
})
export class CostoServicioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costoServicioPopupService: CostoServicioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.costoServicioPopupService
                    .open(CostoServicioDialogComponent as Component,  params['idTramite'],  params['tiposervicio'], params['id']);
            } else {
                this.costoServicioPopupService
                    .open(CostoServicioDialogComponent as Component,  params['idTramite'],  params['tiposervicio']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}


@Directive({
    selector: '[appZero]'
})
export class AppZeroDirective {

    private _restStage: boolean = false;

    constructor(
        private _model: NgModel,
        private _elementRef: ElementRef
    ) {

        this._model.control.valueChanges.subscribe((value: any) => {
            if ((value === null || value === 0) && !this._restStage) {
                this._restStage = true;
                this._elementRef.nativeElement.value = null;
                this._model.control.setValue(null);
                return;
            }
            this._restStage = false;
        });

    }
}

