import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DocumentosMySuffix } from './documentos-my-suffix.model';
import { DocumentosMySuffixPopupService } from './documentos-my-suffix-popup.service';
import { DocumentosMySuffixService } from './documentos-my-suffix.service';
import { ExpedienteMySuffix, ExpedienteMySuffixService } from '../expediente-my-suffix';
import { ExpedienteAsociadoMySuffix, ExpedienteAsociadoMySuffixService } from '../expediente-asociado-my-suffix';
import { TramiteMigratorioMySuffix, TramiteMigratorioMySuffixService } from '../tramite-migratorio-my-suffix';
import { TramiteGeneralMySuffix, TramiteGeneralMySuffixService } from '../tramite-general-my-suffix';
import { TipoServicioMySuffix, TipoServicioMySuffixService } from '../tipo-servicio-my-suffix';

@Component({
    selector: 'jhi-documentos-my-suffix-dialog',
    templateUrl: './documentos-my-suffix-dialog.component.html'
})
export class DocumentosMySuffixDialogComponent implements OnInit {

    documentos: DocumentosMySuffix;
    isSaving: boolean;

    expedientes: ExpedienteMySuffix[];

    expedienteasociados: ExpedienteAsociadoMySuffix[];

    tramitemigratorios: TramiteMigratorioMySuffix[];

    tramitegenerals: TramiteGeneralMySuffix[];

    tiposerviciodocumentos: TipoServicioMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private documentosService: DocumentosMySuffixService,
        private expedienteService: ExpedienteMySuffixService,
        private expedienteAsociadoService: ExpedienteAsociadoMySuffixService,
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
        this.expedienteAsociadoService.query()
            .subscribe((res: HttpResponse<ExpedienteAsociadoMySuffix[]>) => { this.expedienteasociados = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tramiteMigratorioService.query()
            .subscribe((res: HttpResponse<TramiteMigratorioMySuffix[]>) => { this.tramitemigratorios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tramiteGeneralService.query()
            .subscribe((res: HttpResponse<TramiteGeneralMySuffix[]>) => { this.tramitegenerals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tipoServicioService
            .query({filter: 'documentos-is-null'})
            .subscribe((res: HttpResponse<TipoServicioMySuffix[]>) => {
                if (!this.documentos.tipoServicioDocumentosId) {
                    this.tiposerviciodocumentos = res.body;
                } else {
                    this.tipoServicioService
                        .find(this.documentos.tipoServicioDocumentosId)
                        .subscribe((subRes: HttpResponse<TipoServicioMySuffix>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<DocumentosMySuffix>>) {
        result.subscribe((res: HttpResponse<DocumentosMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DocumentosMySuffix) {
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

    trackExpedienteById(index: number, item: ExpedienteMySuffix) {
        return item.id;
    }

    trackExpedienteAsociadoById(index: number, item: ExpedienteAsociadoMySuffix) {
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
    selector: 'jhi-documentos-my-suffix-popup',
    template: ''
})
export class DocumentosMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentosPopupService: DocumentosMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.documentosPopupService
                    .open(DocumentosMySuffixDialogComponent as Component, params['id']);
            } else {
                this.documentosPopupService
                    .open(DocumentosMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
