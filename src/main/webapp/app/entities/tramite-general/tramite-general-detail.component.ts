import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TramiteGeneral } from './tramite-general.model';
import { TramiteGeneralService } from './tramite-general.service';
import { TramiteMigratorioService } from '../tramite-migratorio/tramite-migratorio.service';
import { Cliente, ClienteService } from '../cliente';
import { Estatus, EstatusService } from '../estatus';
import { FechasServicio, FechasServicioService } from '../fechas-servicio';
import { TramiteAsociado, TramiteAsociadoService } from '../tramite-asociado';
import { CostoServicio, CostoServicioService } from '../costo-servicio';
import { Pagos, PagosService } from '../pagos';
import { Observable } from '../../../../../../node_modules/rxjs';
import { DocumentosService, Documentos } from '../documentos';
import { saveAs } from 'file-saver/FileSaver';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../../services/fecha.service';
import { TramiteMigratorio } from '../tramite-migratorio/tramite-migratorio.model';

@Component({
    selector: 'jhi-tramite-general-detail',
    templateUrl: './tramite-general-detail.component.html',
    styleUrls: [
        '../../app.scss'
    ],
    providers: [{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class TramiteGeneralDetailComponent implements OnInit, OnDestroy {

    tipoServicio: number;
    tramiteGeneral: TramiteGeneral;
    isSaving: boolean;
    clientes: Cliente[];
    estatustramitegenerals: Estatus[];
    fechasServicios: FechasServicio[];
    tramiteasociados: TramiteAsociado[];
    fechaIngresoDp: any;
    fechaNotificacionDp: any;
    fechaResolucionDp: any;
    tramiteGenerals: TramiteGeneral[];
    tramiteMigratorios: TramiteMigratorio[];
    documentos: Documentos[];
    costoServicios: CostoServicio[];
    pagos: Pagos[];
    totalCostos: number;
    totalPagos: number;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    predicate: any;
    reverse: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private tramiteGeneralService: TramiteGeneralService,
        private tramiteMigratorioService: TramiteMigratorioService,
        private route: ActivatedRoute,
        private clienteService: ClienteService,
        private estatusService: EstatusService,
        private tramiteAsociadoService: TramiteAsociadoService,
        private fechasServicioService: FechasServicioService,
        private eventManager: JhiEventManager,
        private costoServicioService: CostoServicioService,
        private pagosService: PagosService,
        private documentosService: DocumentosService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.tipoServicio = 1003;
        this.isSaving = false;
        this.clienteService.query()
            .subscribe((res: HttpResponse<Cliente[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));

        this.tramiteAsociadoService.query()
            .subscribe((res: HttpResponse<TramiteAsociado[]>) => { this.tramiteasociados = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTramiteGenerals();
        this.tramiteGeneral = new TramiteGeneral();
    }

    load(id) {
        this.tramiteGeneralService.find(id)
            .subscribe((tramiteGeneralResponse: HttpResponse<TramiteGeneral>) => {
                this.tramiteGeneral = tramiteGeneralResponse.body;
                if (this.tramiteGeneral.fechaIngreso) {
                    this.tramiteGeneral.fechaIngreso = {
                        year: this.tramiteGeneral.fechaIngreso.getFullYear(),
                        month: this.tramiteGeneral.fechaIngreso.getMonth() + 1,
                        day: this.tramiteGeneral.fechaIngreso.getDate()
                    };
                }
                if (this.tramiteGeneral.fechaNotificacion) {
                    this.tramiteGeneral.fechaNotificacion = {
                        year: this.tramiteGeneral.fechaNotificacion.getFullYear(),
                        month: this.tramiteGeneral.fechaNotificacion.getMonth() + 1,
                        day: this.tramiteGeneral.fechaNotificacion.getDate()
                    };
                }
                if (this.tramiteGeneral.fechaResolucion) {
                    this.tramiteGeneral.fechaResolucion = {
                        year: this.tramiteGeneral.fechaResolucion.getFullYear(),
                        month: this.tramiteGeneral.fechaResolucion.getMonth() + 1,
                        day: this.tramiteGeneral.fechaResolucion.getDate()
                    };
                }

                this.totalCostos = 0;
                this.totalPagos = 0;

                this.costoServicioService.findByGeneral(id)
                .subscribe((res: HttpResponse<CostoServicio[]>) => {
                    this.costoServicios = res.body;
                    this.totalCostos = this.costoServicios.reduce(function(prev, cur){
                        return prev + cur.costo;
                    }, 0);
                }, (res: HttpErrorResponse) => this.onError(res.message));

                this.pagosService.findByGeneral(id)
                .subscribe(
                    (res: HttpResponse<Pagos[]>) => {
                        this.pagos = res.body;
                        this.totalPagos = this.pagos.reduce(function(prev, cur){
                            return prev + cur.cantidad;
                        }, 0);
                }, (res: HttpErrorResponse) => this.onError(res.message));

                this.documentosService.findByGeneralId(id).subscribe(
                    (res: HttpResponse<Documentos[]>) => this.documentos = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );

                this.encuentraFechas(id);
                this.tramiteGeneralService.findByAsociados(id)
                .subscribe(
                    (res: HttpResponse<TramiteGeneral[]>) => {
                        this.tramiteGenerals = res.body;
                });

                this.tramiteMigratorioService.findByAsociados(id)
                .subscribe(
                    (res: HttpResponse<TramiteMigratorio[]>) => {
                        this.tramiteMigratorios = res.body;
                });

                this.estatusService
                .query({filter: 'tramitegeneral-is-null'})
                .subscribe((res: HttpResponse<Estatus[]>) => {
                    if (!this.tramiteGeneral.estatusTramiteGeneralId) {
                        this.estatustramitegenerals = res.body;
                        this.estatustramitegenerals = this.estatustramitegenerals.filter((s) => {
                            return s.tipoServicioId === this.tipoServicio;
                        });

                    } else {
                        this.estatusService
                            .find(this.tramiteGeneral.estatusTramiteGeneralId)
                            .subscribe((subRes: HttpResponse<Estatus>) => {
                               this.estatustramitegenerals = res.body;
                                this.estatustramitegenerals = this.estatustramitegenerals.filter((s) => {
                                    return s.tipoServicioId === this.tipoServicio;
                                });
                            }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                    }
                }, (res: HttpErrorResponse) => this.onError(res.message));
            });
    }

    encuentraFechas(id) {
        this.fechasServicioService.findByGeneralId(id).subscribe(
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

    registerChangeInTramiteGenerals() {
        this.eventSubscriber = this.eventManager.subscribe('tramiteGeneralListModification', (response) => this.load(this.tramiteGeneral.id));
    }

    save() {
        this.isSaving = true;
        if (this.tramiteGeneral.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tramiteGeneralService.update(this.tramiteGeneral));
                this.router.navigate(['/tramite-general-usuario', this.tramiteGeneral.clienteId]).then((res) => {
                    // this.clear();
                });
        } else {
            this.subscribeToSaveResponse(
                this.tramiteGeneralService.create(this.tramiteGeneral));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TramiteGeneral>>) {
        result.subscribe((res: HttpResponse<TramiteGeneral>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TramiteGeneral) {
        this.eventManager.broadcast({ name: 'tramiteGeneralListModification', content: 'OK'});
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

    trackTramiteAsociadoById(index: number, item: TramiteAsociado) {
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
        this.documentosService.getFile(fileName, idCliente, tipoServicioId, String(this.tramiteGeneral.id)).subscribe((data) => {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            saveAs(blob, fileName);
        }, (error) => {
            console.log(error);
        });
    }
}
