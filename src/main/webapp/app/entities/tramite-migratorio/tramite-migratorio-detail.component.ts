import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { TramiteMigratorio } from './tramite-migratorio.model';
import { TramiteMigratorioService } from './tramite-migratorio.service';
import { Cliente, ClienteService } from '../cliente';
import { Estatus, EstatusService } from '../estatus';
import { TramiteAsociado, TramiteAsociadoService } from '../tramite-asociado';
import { Subscription } from 'rxjs/Subscription';
import { FechasServicioService, FechasServicio} from '../fechas-servicio';
import { CostoServicioService, CostoServicio } from '../costo-servicio';
import { PagosService, Pagos } from '../pagos';
import { DocumentosService, Documentos } from '../documentos';

@Component({
    selector: 'jhi-tramite-migratorio-detail',
    templateUrl: './tramite-migratorio-detail.component.html',
    styleUrls: [
        '../../app.scss'
    ]
})
export class TramiteMigratorioDetailComponent implements OnInit, OnDestroy {

    tipoServicio: number;
    tramiteMigratorio: TramiteMigratorio;
    isSaving: boolean;
    clientes: Cliente[];
    estatustramitemigratorios: Estatus[];
    fechasServicios: FechasServicio[];
    tramiteasociados: TramiteAsociado[];
    fechaIngresoDp: any;
    fechaNotificacionDp: any;
    fechaResolucionDp: any;
    eventSubscriberFechas: Subscription;
    tramiteMigratorios: TramiteMigratorio[];
    documentos: Documentos[];
    costoServicios: CostoServicio[];
    pagos: Pagos[];
    totalCostos: number;
    totalPagos: number;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private jhiAlertService: JhiAlertService,
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
    ) {
    }

    ngOnInit() {
        this.tipoServicio = 1002;
        this.isSaving = false;
        this.clienteService.query()
            .subscribe((res: HttpResponse<Cliente[]>) => { this.clientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));

        this.tramiteAsociadoService.query()
            .subscribe((res: HttpResponse<TramiteAsociado[]>) => { this.tramiteasociados = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTramiteMigratorios();
    }

    load(id) {
        this.tramiteMigratorioService.find(id)
            .subscribe((tramiteMigratorioResponse: HttpResponse<TramiteMigratorio>) => {
                this.tramiteMigratorio = tramiteMigratorioResponse.body;
                if (this.tramiteMigratorio.fechaIngreso) {
                    this.tramiteMigratorio.fechaIngreso = {
                        year: this.tramiteMigratorio.fechaIngreso.getFullYear(),
                        month: this.tramiteMigratorio.fechaIngreso.getMonth() + 1,
                        day: this.tramiteMigratorio.fechaIngreso.getDate()
                    };
                }
                if (this.tramiteMigratorio.fechaNotificacion) {
                    this.tramiteMigratorio.fechaNotificacion = {
                        year: this.tramiteMigratorio.fechaNotificacion.getFullYear(),
                        month: this.tramiteMigratorio.fechaNotificacion.getMonth() + 1,
                        day: this.tramiteMigratorio.fechaNotificacion.getDate()
                    };
                }
                if (this.tramiteMigratorio.fechaResolucion) {
                    this.tramiteMigratorio.fechaResolucion = {
                        year: this.tramiteMigratorio.fechaResolucion.getFullYear(),
                        month: this.tramiteMigratorio.fechaResolucion.getMonth() + 1,
                        day: this.tramiteMigratorio.fechaResolucion.getDate()
                    };
                }

                this.totalCostos = 0;
                this.totalPagos = 0;

                this.costoServicioService.findByMigratorio(id)
                .subscribe((res: HttpResponse<CostoServicio[]>) => {
                    this.costoServicios = res.body;
                    this.totalCostos = this.costoServicios.reduce(function(prev, cur){
                        return prev + cur.costo;
                    }, 0);
                }, (res: HttpErrorResponse) => this.onError(res.message));

                this.pagosService.findByMigratorio(id)
                .subscribe(
                    (res: HttpResponse<Pagos[]>) => {
                        this.pagos = res.body;
                        this.totalPagos = this.pagos.reduce(function(prev, cur){
                            return prev + cur.cantidad;
                        }, 0);
                }, (res: HttpErrorResponse) => this.onError(res.message));

                this.documentosService.findByMigratorioId(id).subscribe(
                    (res: HttpResponse<Documentos[]>) => this.documentos = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );

                this.encuentraFechas(id);
                this.tramiteMigratorioService.findByAsociados(id)
                .subscribe(
                    (res: HttpResponse<TramiteMigratorio[]>) => {
                        this.tramiteMigratorios = res.body;
                });

                this.estatusService
                .query({filter: 'tramitemigratorio-is-null'})
                .subscribe((res: HttpResponse<Estatus[]>) => {
                    if (!this.tramiteMigratorio.estatusTramiteMigratorioId) {
                        this.estatustramitemigratorios = res.body;
                        this.estatustramitemigratorios = this.estatustramitemigratorios.filter((s) => {
                            return s.tipoServicioId === this.tipoServicio;
                        });

                    } else {
                        this.estatusService
                            .find(this.tramiteMigratorio.estatusTramiteMigratorioId)
                            .subscribe((subRes: HttpResponse<Estatus>) => {
                               // this.estatustramitemigratorios = [subRes.body].concat(res.body);
                               this.estatustramitemigratorios = res.body;
                                this.estatustramitemigratorios = this.estatustramitemigratorios.filter((s) => {
                                    return s.tipoServicioId === this.tipoServicio;
                                });
                            }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                    }
                }, (res: HttpErrorResponse) => this.onError(res.message));
            });
    }

    encuentraFechas(id) {
        this.fechasServicioService.findByMigratorioId(id).subscribe(
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

    registerChangeInTramiteMigratorios() {
        this.eventSubscriber = this.eventManager.subscribe('tramiteMigratorioListModification', (response) => this.load(this.tramiteMigratorio.id));
    }

    save() {
        this.isSaving = true;
        if (this.tramiteMigratorio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tramiteMigratorioService.update(this.tramiteMigratorio));
        } else {
            this.subscribeToSaveResponse(
                this.tramiteMigratorioService.create(this.tramiteMigratorio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TramiteMigratorio>>) {
        result.subscribe((res: HttpResponse<TramiteMigratorio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TramiteMigratorio) {
        this.eventManager.broadcast({ name: 'tramiteMigratorioListModification', content: 'OK'});
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
}
