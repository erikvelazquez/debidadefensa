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

@Component({
    selector: 'jhi-documentos-dialog',
    templateUrl: './documentos-dialog.component.html'
})
export class DocumentosDialogComponent implements OnInit {

    documentos: Documentos;
    isSaving: boolean;

    expedientes: Expediente[];

    expedienteasociados: ExpedienteAsociado[];

    tramitemigratorios: TramiteMigratorio[];

    tramitegenerals: TramiteGeneral[];

    tiposerviciodocumentos: TipoServicio[];

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
        this.tipoServicioService
            .query({filter: 'documentos-is-null'})
            .subscribe((res: HttpResponse<TipoServicio[]>) => {
                if (!this.documentos.tipoServicioDocumentosId) {
                    this.tiposerviciodocumentos = res.body;
                } else {
                    this.tipoServicioService
                        .find(this.documentos.tipoServicioDocumentosId)
                        .subscribe((subRes: HttpResponse<TipoServicio>) => {
                            this.tiposerviciodocumentos = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.documentos.id !== undefined) {
            this.subscribeToSaveResponse(
                this.documentosService.update(this.documentos));
        } else {
            this.subscribeToSaveResponse(
                this.documentosService.create(this.documentos));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Documentos>>) {
        result.subscribe((res: HttpResponse<Documentos>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Documentos) {
        this.eventManager.broadcast({ name: 'documentosListModification', content: 'OK'});
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
                    .open(DocumentosDialogComponent as Component, params['id']);
            } else {
                this.documentosPopupService
                    .open(DocumentosDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
