import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pagos } from './pagos.model';
import { PagosPopupService } from './pagos-popup.service';
import { PagosService } from './pagos.service';
import { Expediente, ExpedienteService } from '../expediente';
import { TramiteMigratorio, TramiteMigratorioService } from '../tramite-migratorio';
import { TramiteGeneral, TramiteGeneralService } from '../tramite-general';
import { TipoServicio, TipoServicioService } from '../tipo-servicio';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../../services/fecha.service';

@Component({
    selector: 'jhi-pagos-dialog',
    templateUrl: './pagos-dialog.component.html',
    styleUrls: [
        '../../app.scss'
    ],
    providers: [{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class PagosDialogComponent implements OnInit {

    pagos: Pagos;
    isSaving: boolean;

    expedientes: Expediente[];

    tramitemigratorios: TramiteMigratorio[];

    tramitegenerals: TramiteGeneral[];

    tiposervicios: TipoServicio[];
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pagosService: PagosService,
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
        if (this.pagos.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pagosService.update(this.pagos));
        } else {
            this.subscribeToSaveResponse(
                this.pagosService.create(this.pagos));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Pagos>>) {
        result.subscribe((res: HttpResponse<Pagos>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Pagos) {
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
    selector: 'jhi-pagos-popup',
    template: ''
})
export class PagosPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagosPopupService: PagosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pagosPopupService
                    .open(PagosDialogComponent as Component, params['idTramite'],  params['tiposervicio'], params['id']);
            } else {
                this.pagosPopupService
                    .open(PagosDialogComponent as Component, params['idTramite'],  params['tiposervicio']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
