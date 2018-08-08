import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FechasServicio } from './fechas-servicio.model';
import { FechasServicioPopupService } from './fechas-servicio-popup.service';
import { FechasServicioService } from './fechas-servicio.service';
import { Expediente, ExpedienteService } from '../expediente';
import { TramiteMigratorio, TramiteMigratorioService } from '../tramite-migratorio';
import { TramiteGeneral, TramiteGeneralService } from '../tramite-general';
import { TipoServicio, TipoServicioService } from '../tipo-servicio';

@Component({
    selector: 'jhi-fechas-servicio-dialog',
    templateUrl: './fechas-servicio-dialog.component.html',
    styleUrls: [
        '../../app.scss'
    ]
})
export class FechasServicioDialogComponent implements OnInit {

   
    fechasServicio: FechasServicio;
    isSaving: boolean;

    expedientes: Expediente[];


    tramitemigratorios: TramiteMigratorio[];

    tramitegenerals: TramiteGeneral[];
    date: Date;
    tiposervicios: TipoServicio[];
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private fechasServicioService: FechasServicioService,
        private expedienteService: ExpedienteService,
        private tramiteMigratorioService: TramiteMigratorioService,
        private tramiteGeneralService: TramiteGeneralService,
        private tipoServicioService: TipoServicioService,
        private eventManager: JhiEventManager,        
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.date =new Date();
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
        if (this.fechasServicio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.fechasServicioService.update(this.fechasServicio));
        } else {
            this.subscribeToSaveResponse(
                this.fechasServicioService.create(this.fechasServicio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FechasServicio>>) {
        result.subscribe((res: HttpResponse<FechasServicio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FechasServicio) {
        switch(result.tipoServicioId) { 
            case 1001: { 
               //Expediente; 
               this.eventManager.broadcast({ name: 'expedienteListModification', content: 'OK'});
               break; 
            } 
            case 1002: { 
               //Migratorio; 
               this.eventManager.broadcast({ name: 'tramiteMigratorioListModification', content: 'OK'});
               break; 
            } 
            case 1003: { 
                //General; 
                this.eventManager.broadcast({ name: 'tramiteGeneralListModification', content: 'OK'});
                break; 
             } 
            default: { 
               //statements; 
               break; 
            } 
        } 

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
    selector: 'jhi-fechas-servicio-popup',
    template: ''
})
export class FechasServicioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fechasServicioPopupService: FechasServicioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fechasServicioPopupService
                    .open(FechasServicioDialogComponent as Component,  params['idTramite'],  params['tiposervicio'], params['id']);
            } else {
                this.fechasServicioPopupService
                    .open(FechasServicioDialogComponent as Component,  params['idTramite'],  params['tiposervicio']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
