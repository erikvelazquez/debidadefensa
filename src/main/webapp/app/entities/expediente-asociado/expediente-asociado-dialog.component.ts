import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { ExpedienteAsociado } from './expediente-asociado.model';
import { ExpedienteAsociadoPopupService } from './expediente-asociado-popup.service';
import { ExpedienteAsociadoService } from './expediente-asociado.service';
import { Expediente, ExpedienteService } from '../expediente';
import { Estatus, EstatusService } from '../estatus';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../../services/fecha.service';
import { Subscription } from 'rxjs/Subscription';
import { Documentos, DocumentosService } from '../documentos';
import { saveAs } from 'file-saver/FileSaver';

@Component({
    selector: 'jhi-expediente-asociado-dialog',
    templateUrl: './expediente-asociado-dialog.component.html',
    styleUrls: [
        '../../app.scss'
    ],
    providers: [{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class ExpedienteAsociadoDialogComponent implements OnInit {

    expedienteAsociado: ExpedienteAsociado;
    isSaving: boolean;
    expedienteOriginal: Expediente;
    expedientes: Expediente[];
    tipoServicio: number;
    estatusexpedienteasociados: Estatus[];
    fechaSentenciaDp: any;
    private eventSubscriber: Subscription;
    documentos: Documentos[];
    esDeshabilitada: boolean;
    esVisibleCarga: boolean;

    constructor(
        private documentosService: DocumentosService,
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private expedienteAsociadoService: ExpedienteAsociadoService,
        private expedienteService: ExpedienteService,
        private estatusService: EstatusService,
        private eventManager: JhiEventManager
    ) {
        this.expedienteOriginal = new Expediente();
        this.esDeshabilitada = false;
        this.esVisibleCarga = false;
    }

    ngOnInit() {
        this.tipoServicio = 1004;
        this.isSaving = false;
        this.expedienteService.query()
            .subscribe((res: HttpResponse<Expediente[]>) => {
                this.expedientes = res.body;
                this.expedienteOriginal = this.expedientes.find((item) => item.id === this.expedienteAsociado.expedienteId);
                if (this.expedienteAsociado.id !== undefined) {
                    this.cargaDocumentos();
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.estatusService
            .query({filter: 'expedienteasociado-is-null'})
            .subscribe((res: HttpResponse<Estatus[]>) => {
                if (!this.expedienteAsociado.estatusExpedienteAsociadoId) {
                    this.estatusexpedienteasociados = res.body;
                    this.estatusexpedienteasociados = this.estatusexpedienteasociados.filter((s) => {
                        return s.tipoServicioId === 1001;
                    });
                } else {
                    this.estatusService
                        .find(this.expedienteAsociado.estatusExpedienteAsociadoId)
                        .subscribe((subRes: HttpResponse<Estatus>) => {
                            this.estatusexpedienteasociados = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.registerChangeInExpedientes();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    cargaDocumentos() {
        this.documentosService.findByExpedienteAsociadosId(this.expedienteAsociado.id).subscribe(
            (res: HttpResponse<Documentos[]>) => {
                this.documentos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    save() {
        this.isSaving = true;
        if (this.expedienteAsociado.id !== undefined) {
            this.subscribeToSaveResponse(
                this.expedienteAsociadoService.update(this.expedienteAsociado));
        } else {
            this.subscribeToSaveResponse(
                this.expedienteAsociadoService.create(this.expedienteAsociado));
        }
    }

    registerChangeInExpedientes() {
        this.eventSubscriber = this.eventManager.subscribe('expedienteAsociadoListModification', () => {
            this.cargaDocumentos();
            this.esDeshabilitada = false;
        });
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ExpedienteAsociado>>) {
        result.subscribe((res: HttpResponse<ExpedienteAsociado>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ExpedienteAsociado) {
        this.eventManager.broadcast({ name: 'expedienteListModification', content: 'OK'});
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

    trackEstatusById(index: number, item: Estatus) {
        return item.id;
    }

    getFile(fileName: String, idCliente: string, tipoServicioId: string) {
        this.esVisibleCarga = true;
        this.documentosService.getFile(fileName, idCliente, tipoServicioId, String(this.expedienteAsociado.id)).subscribe((data) => {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            this.esVisibleCarga = false;
            saveAs(blob, fileName);
        }, (error) => {
            this.esVisibleCarga = false;
            console.log(error);
        });
    }
}

@Component({
    selector: 'jhi-expediente-asociado-popup',
    template: ''
})
export class ExpedienteAsociadoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private expedienteAsociadoPopupService: ExpedienteAsociadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.expedienteAsociadoPopupService
                    .open(ExpedienteAsociadoDialogComponent as Component, params['idExpediente'], params['id']);
            } else {
                this.expedienteAsociadoPopupService
                    .open(ExpedienteAsociadoDialogComponent as Component, params['idExpediente']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
