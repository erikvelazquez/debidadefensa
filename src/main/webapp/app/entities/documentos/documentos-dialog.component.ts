import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Documentos } from './documentos.model';
import { DocumentosPopupService } from './documentos-popup.service';
import { DocumentosService } from './documentos.service';
import { Expediente, ExpedienteService } from '../expediente';
import { ExpedienteAsociado, ExpedienteAsociadoService } from '../expediente-asociado';
import { TramiteMigratorio, TramiteMigratorioService } from '../tramite-migratorio';
import { TramiteGeneral, TramiteGeneralService } from '../tramite-general';
import { TipoServicio, TipoServicioService } from '../tipo-servicio';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../../services/fecha.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({
    selector: 'jhi-documentos-dialog',
    templateUrl: './documentos-dialog.component.html',
    styleUrls: [
        '../../app.scss'
    ],
    providers: [{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class DocumentosDialogComponent implements OnInit {

    documentos: Documentos;
    isSaving: boolean;

    expedientes: Expediente[];

    expedienteasociados: ExpedienteAsociado[];

    tramitemigratorios: TramiteMigratorio[];

    tramitegenerals: TramiteGeneral[];

    tiposervicios: TipoServicio[];
    fechaDp: any;
    fileToUpload: File = null;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private documentosService: DocumentosService,
        private expedienteService: ExpedienteService,
        private expedienteAsociadoService: ExpedienteAsociadoService,
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
        this.expedienteAsociadoService.query()
            .subscribe((res: HttpResponse<ExpedienteAsociado[]>) => { this.expedienteasociados = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tramiteMigratorioService.query()
            .subscribe((res: HttpResponse<TramiteMigratorio[]>) => { this.tramitemigratorios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tramiteGeneralService.query()
            .subscribe((res: HttpResponse<TramiteGeneral[]>) => { this.tramitegenerals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tipoServicioService.query()
            .subscribe((res: HttpResponse<TipoServicio[]>) => { this.tiposervicios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        this.documentos.nombreDocumento = this.fileToUpload.name;
    }

    clear() {
        if (this.documentos.tipoServicioId === 1004) {
            this.eventManager.broadcast({ name: 'expedienteAsociadoListModification', content: 'OK'});
        }
        this.activeModal.dismiss('cancel');
    }

    save() {
       /* this.isSaving = true;
        if (this.documentos.id !== undefined) {
            this.subscribeToSaveResponse(
                this.documentosService.update(this.documentos));
        } else {
            this.subscribeToSaveResponse(
                this.documentosService.create(this.documentos));
        }
        this.documentosService.postFile(this.fileToUpload)
        .subscribe(event => {
            if (event instanceof HttpResponse) {
               console.log(event.body);
             }
        });*/
        switch (this.documentos.tipoServicioId) {
            case 1001: {
            // Expediente;
                this.documentos.idDocumento = this.documentos.expedienteId;
                break;
            }
            case 1002: {
            // Migratorio;
                this.documentos.idDocumento = this.documentos.tramiteMigratorioId;
                break;
            }
            case 1003: {
                // General;
                this.documentos.idDocumento = this.documentos.tramiteGeneralId;
                break;
            }
            case 1004: {
                // General;
                this.documentos.idDocumento = this.documentos.expedienteAsociadoId;
                break;
            }
            default: {
            // statements;
            break;
            }
        }
        this.subscribeToSaveResponse(this.documentosService.create(this.fileToUpload, this.documentos));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Documentos>>) {
        alert('lo estoy enviando');
        result.subscribe((res: HttpResponse<Documentos>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Documentos) {
        switch (result.tipoServicioId) {
            case 1001: {
            // Expediente;
            this.eventManager.broadcast({ name: 'expedienteListModification', content: 'OK'});
            break;
            }
            case 1002: {
            // Migratorio;
            this.eventManager.broadcast({ name: 'tramiteMigratorioListModification', content: 'OK'});
            break;
            }
            case 1003: {
                // General;
                this.eventManager.broadcast({ name: 'tramiteGeneralListModification', content: 'OK'});
                break;
            }
            case 1004: {
                // General;
                this.eventManager.broadcast({ name: 'expedienteAsociadoListModification', content: 'OK'});
                break;
            }
            default: {
            // statements;
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

    trackExpedienteAsociadoById(index: number, item: ExpedienteAsociado) {
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

    /****************************   NUEVO CODIGO**************************** */

}

@Component({
    selector: 'jhi-documentos-popup',
    template: ''
})
export class DocumentosPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentosPopupService: DocumentosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.documentosPopupService
                    .open(DocumentosDialogComponent as Component, params['idTramite'], params['tiposervicio'], params['idCliente'], params['id']);
            } else {
                this.documentosPopupService
                    .open(DocumentosDialogComponent as Component, params['idTramite'], params['tiposervicio'], params['idCliente']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
