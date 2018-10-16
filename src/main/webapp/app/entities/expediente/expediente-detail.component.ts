import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Expediente } from './expediente.model';
import { ExpedienteService } from './expediente.service';
import { Cliente, ClienteService } from '../cliente';
import { Estatus, EstatusService } from '../estatus';
import { FechasServicio, FechasServicioService } from '../fechas-servicio';
import { CostoServicio, CostoServicioService } from '../costo-servicio';
import { Pagos, PagosService } from '../pagos';
import { Observable } from '../../../../../../node_modules/rxjs';
import { Parte, ParteService } from '../parte';
import { ExpedienteAsociadoService, ExpedienteAsociado } from '../expediente-asociado';
import { Documentos, DocumentosService } from '../documentos';
import { saveAs } from 'file-saver/FileSaver';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../../services/fecha.service';

@Component({
    selector: 'jhi-expediente-detail',
    templateUrl: './expediente-detail.component.html',
    styleUrls: [
        '../../app.scss'
    ],
    providers: [{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class ExpedienteDetailComponent implements OnInit, OnDestroy {
    tipoServicio: number;
    expediente: Expediente;
    isSaving: boolean;
    clientes: Cliente[];
    estatusexpedientes: Estatus[];
    expedienteAsociados: ExpedienteAsociado[];
    fechasServicios: FechasServicio[];
    documentos: Documentos[];
    fechaAltaDp: any;
    fechaSentenciaDp: any;
    partes: Parte[];
    currentAccount: any;

    costoServicios: CostoServicio[];
    pagos: Pagos[];
    totalCostos: number;
    totalPagos: number;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    fileUploads: Observable<string[]>;
    imageToShow: any;

    constructor(
        private documentosService: DocumentosService,
        private jhiAlertService: JhiAlertService,
        private expedienteService: ExpedienteService,
        private expedienteAsociadoService: ExpedienteAsociadoService,
        private route: ActivatedRoute,
        private clienteService: ClienteService,
        private estatusService: EstatusService,
        private fechasServicioService: FechasServicioService,
        private eventManager: JhiEventManager,
        private costoServicioService: CostoServicioService,
        private pagosService: PagosService,
        private parteService: ParteService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.tipoServicio = 1001;
        this.isSaving = false;
        this.clienteService.query()
            .subscribe((res: HttpResponse<Cliente[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
                this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInExpedientes();
        this.expediente = new Expediente();
    }

    load(id) {
        this.expedienteService.find(id)
            .subscribe((expedienteResponse: HttpResponse<Expediente>) => {
                this.expediente = expedienteResponse.body;
                if (this.expediente.fechaAlta) {
                    this.expediente.fechaAlta = {
                        year: this.expediente.fechaAlta.getFullYear(),
                        month: this.expediente.fechaAlta.getMonth() + 1,
                        day: this.expediente.fechaAlta.getDate()
                    };
                }
                if (this.expediente.fechaSentencia) {
                    this.expediente.fechaSentencia = {
                        year: this.expediente.fechaSentencia.getFullYear(),
                        month: this.expediente.fechaSentencia.getMonth() + 1,
                        day: this.expediente.fechaSentencia.getDate()
                    };
                }

                this.totalCostos = 0;
                this.totalPagos = 0;

                this.costoServicioService.findByExpediente(id)
                .subscribe((res: HttpResponse<CostoServicio[]>) => {
                    this.costoServicios = res.body;
                    this.totalCostos = this.costoServicios.reduce(function(prev, cur){
                        return prev + cur.costo;
                    }, 0);
                }, (res: HttpErrorResponse) => this.onError(res.message));

                this.pagosService.findByExpediente(id)
                .subscribe(
                    (res: HttpResponse<Pagos[]>) => {
                        this.pagos = res.body;
                        this.totalPagos = this.pagos.reduce(function(prev, cur){
                            return prev + cur.cantidad;
                        }, 0);
                }, (res: HttpErrorResponse) => this.onError(res.message));

                this.parteService.findByExpediente(id)
                .subscribe(
                    (res: HttpResponse<Parte[]>) => {
                        this.partes = res.body;
                }, (res: HttpErrorResponse) => this.onError(res.message));
                this.encuentraFechas(id);

                this.expedienteAsociadoService.findByExpediente(id)
                .subscribe(
                    (res: HttpResponse<ExpedienteAsociado[]>) => {
                        this.expedienteAsociados = res.body;
                }, (res: HttpErrorResponse) => this.onError(res.message));

                this.documentosService.findByExpedienteId(id).subscribe(
                    (res: HttpResponse<Documentos[]>) => this.documentos = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );

                this.encuentraFechas(id);

                this.estatusService
                .query({filter: 'expediente-is-null'})
                .subscribe((res: HttpResponse<Estatus[]>) => {
                    if (!this.expediente.estatusExpedienteId) {
                        this.estatusexpedientes = res.body;
                        this.estatusexpedientes = this.estatusexpedientes.filter((s) => {
                            return s.tipoServicioId === this.tipoServicio;
                        });
                    } else {
                        this.estatusService
                            .find(this.expediente.estatusExpedienteId)
                            .subscribe((subRes: HttpResponse<Estatus>) => {
                               // this.estatustramitemigratorios = [subRes.body].concat(res.body);
                               this.estatusexpedientes = res.body;
                                this.estatusexpedientes = this.estatusexpedientes.filter((s) => {
                                    return s.tipoServicioId === this.tipoServicio;
                                });
                            }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                    }
                }, (res: HttpErrorResponse) => this.onError(res.message));
            });
    }

    encuentraFechas(id) {
        this.fechasServicioService.findByExpedienteId(id).subscribe(
            (res: HttpResponse<FechasServicio[]>) => this.fechasServicios = res.body,
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExpedientes() {
        this.eventSubscriber = this.eventManager.subscribe('expedienteListModification', () => this.load(this.expediente.id));
    }

    save() {
        this.isSaving = true;
        if (this.expediente.id !== undefined) {
            this.subscribeToSaveResponse(
                this.expedienteService.update(this.expediente));
                this.router.navigate(['/expediente-usuario', this.expediente.clienteId]).then((res) => {
                    // this.clear();
                });
        } else {
            this.subscribeToSaveResponse(
                this.expedienteService.create(this.expediente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Expediente>>) {
        result.subscribe((res: HttpResponse<Expediente>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Expediente) {
        this.eventManager.broadcast({ name: 'expedienteListMainModification', content: 'OK'});
        this.isSaving = false;
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClienteById(index: number, item: Cliente) {
        return item.id;
    }

    trackEstatusById(index: number, item: Estatus) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }

    getFile(fileName: String, idCliente: string, tipoServicioId: string) {
        this.documentosService.getFile(fileName, idCliente, tipoServicioId, String(this.expediente.id)).subscribe((data) => {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            saveAs(blob, fileName);
        }, (error) => {
            console.log(error);
        });
    }
}
