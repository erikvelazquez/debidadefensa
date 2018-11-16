import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
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
import { CSRFService } from '../../shared/auth/csrf.service';
import { SessionStorageService } from 'ngx-webstorage';
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
    current: Number = 0;
    max: Number = 100;
    esVisibleCarga: boolean;
    /***********nuevo* */

    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private documentosService: DocumentosService,
        private expedienteService: ExpedienteService,
        private expedienteAsociadoService: ExpedienteAsociadoService,
        private tramiteMigratorioService: TramiteMigratorioService,
        private tramiteGeneralService: TramiteGeneralService,
        private tipoServicioService: TipoServicioService,
        private eventManager: JhiEventManager,
        private csrfService: CSRFService,
        private $sessionStorage: SessionStorageService
    ) {
        this.options = { concurrency: 1, maxUploads: 3 };
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
        this.esVisibleCarga = false;
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

    onUploadOutput(output: UploadOutput): void {
        switch (output.type) {
          case 'allAddedToQueue':
              // uncomment this if you want to auto upload files when added
              // const event: UploadInput = {
              //   type: 'uploadAll',
              //   url: '/upload',
              //   method: 'POST',
              //   data: { foo: 'bar' }
              // };
              // this.uploadInput.emit(event);
            break;
          case 'addedToQueue':
            if (typeof output.file !== 'undefined') {
            this.current = 0;
              this.files.push(output.file);
              // this.fileToUpload = files.item(0);
              this.documentos.nombreDocumento = output.file.name;
            }
            break;
          case 'uploading':
            if (typeof output.file !== 'undefined') {
              //  alert(output.file.progress.data.percentage);
              // update current data in files array for uploading file
              const index = this.files.findIndex((file) => typeof output.file !== 'undefined' && file.id === output.file.id);
              this.files[index] = output.file;
              this.current = output.file.progress.data.percentage;
            }
            break;
          case 'removed':
            // remove file from array when removed
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
            break;
          case 'dragOver':
            this.dragOver = true;
            break;
          case 'dragOut':
          case 'drop':
            this.dragOver = false;
            break;
          case 'done':
            // alert(output.type);
            const res: Documentos =  output.file.response;
            if (res.id !== null) {
                this.onSaveSuccess(res);
            }
            // The file is downloaded
            break;
        }
      }

      startUpload(): void {

        this.esVisibleCarga = true;
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

        let daySelected: string = this.documentos.fecha.day;
        daySelected = daySelected.toString();
        const event: UploadInput = {

        type: 'uploadAll',
        url: 'api/documentos/upload',
        method: 'POST',
        data: {
            idCliente: this.documentos.idCliente.toString(),
            tipoServicioId: this.documentos.tipoServicioId.toString(),
            idDocumento: this.documentos.idDocumento.toString(),
            descripcion: this.documentos.descripcion,
            fecha: ( daySelected.length === 1 ? '0' + this.documentos.fecha.day : this.documentos.fecha.day) + '/' + this.documentos.fecha.month + '/' + this.documentos.fecha.year
        },
        withCredentials: true,
        headers: { 'Authorization': 'Bearer ' + this.$sessionStorage.retrieve('authenticationToken')}
        };

        this.uploadInput.emit(event);
    }

    //   startUpload(): void {
    //     const event: UploadInput = {
    //       type: 'uploadAll',
    //       url: 'http://ngx-uploader.com/upload',
    //       method: 'POST',
    //       data: { foo: 'bar' }
    //     };

    //     this.uploadInput.emit(event);
    //   }

    //   cancelUpload(id: string): void {
    //     this.uploadInput.emit({ type: 'cancel', id: id });
    //   }

    //   removeFile(id: string): void {
    //     this.uploadInput.emit({ type: 'remove', id: id });
    //   }

      removeAllFiles(): void {
        this.uploadInput.emit({ type: 'removeAll' });
      }
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
