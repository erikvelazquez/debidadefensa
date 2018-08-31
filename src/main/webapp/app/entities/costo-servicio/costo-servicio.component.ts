import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CostoServicio } from './costo-servicio.model';
import { CostoServicioService } from './costo-servicio.service';
import { Principal } from '../../shared';
import { Cliente } from '../cliente';
import { Pagos, PagosService } from '../pagos';
import { TramiteMigratorio, TramiteMigratorioService } from '../tramite-migratorio';
import { TramiteGeneralService, TramiteGeneral } from '../tramite-general';
import { Expediente, ExpedienteService } from '../expediente';

@Component({
    selector: 'jhi-costo-servicio',
    templateUrl: './costo-servicio.component.html'
})
export class CostoServicioComponent implements OnInit, OnDestroy {
    costoServicios: CostoServicio[];
    pagos: Pagos[];
    idTramite: number;
    tiposervicio: String;
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    cliente: Cliente;

    totalCostos: number;
    totalPagos: number;

    nombreTipoServicio: String;

    tramiteMigratorio: TramiteMigratorio;
    tramiteGeneral: TramiteGeneral;
    expediente: Expediente;

    constructor(
        private costoServicioService: CostoServicioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private pagosService: PagosService,
        private route: ActivatedRoute,
        private tramiteMigratorioService: TramiteMigratorioService,
        private tramiteGeneralService: TramiteGeneralService,
        private expedienteService: ExpedienteService
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
        this.activatedRoute.snapshot.params['search'] : '';
        this.tramiteGeneral = new TramiteGeneral();
        this.tramiteMigratorio = new TramiteMigratorio();
        this.expediente = new Expediente();
    }

    loadAll() {
        this.totalCostos = 0;
        this.totalPagos = 0;

        switch (this.tiposervicio) {
            case '1001': {
               // Expediente;
               this.expedienteService.find(this.idTramite )
               .subscribe((expedienteResponse: HttpResponse<Expediente>) => {
                    this.expediente = expedienteResponse.body;
               });

               this.nombreTipoServicio = 'Expediente';

               this.costoServicioService.findByExpediente(this.idTramite)
                .subscribe((res: HttpResponse<CostoServicio[]>) => {
                    this.costoServicios = res.body;
                    this.calculaTotles();
                }, (res: HttpErrorResponse) => this.onError(res.message));

                this.pagosService.findByExpediente(this.idTramite)
                .subscribe(
                    (res: HttpResponse<Pagos[]>) => {
                        this.pagos = res.body;
                        this.calculaTotles();
                }, (res: HttpErrorResponse) => this.onError(res.message));
               break;
            }
            case '1002': {
               // Migratorio
               this.tramiteMigratorioService.find(this.idTramite )
               .subscribe((tramiteMigratorioResponse: HttpResponse<TramiteMigratorio>) => {
                    this.tramiteMigratorio = tramiteMigratorioResponse.body;
               });

               this.nombreTipoServicio = 'Tramite Migratorio';

               this.costoServicioService.findByMigratorio(this.idTramite)
                .subscribe((res: HttpResponse<CostoServicio[]>) => {
                    this.costoServicios = res.body;
                    this.calculaTotles();
                }, (res: HttpErrorResponse) => this.onError(res.message));

                this.pagosService.findByMigratorio(this.idTramite)
                .subscribe(
                    (res: HttpResponse<Pagos[]>) => {
                        this.pagos = res.body;
                        this.calculaTotles();
                }, (res: HttpErrorResponse) => this.onError(res.message));
               break;
            }
            case '1003': {
                // General

                this.tramiteGeneralService.find(this.idTramite )
                .subscribe((tramiteGeneralResponse: HttpResponse<TramiteGeneral>) => {
                     this.tramiteGeneral = tramiteGeneralResponse.body;
                });

                this.nombreTipoServicio = 'Tramite General';
                this.costoServicioService.findByGeneral(this.idTramite).subscribe((res: HttpResponse<CostoServicio[]>) => {
                    this.costoServicios = res.body;
                    this.calculaTotles();
                }, (res: HttpErrorResponse) => this.onError(res.message));

                this.pagosService.findByGeneral(this.idTramite).subscribe(
                    (res: HttpResponse<Pagos[]>) => {
                        this.pagos = res.body;
                        this.calculaTotles();
                }, (res: HttpErrorResponse) => this.onError(res.message));
                break;
             }
            default: {
               // statements;
               break;
            }
        }
    }

    calculaTotles() {
        this.totalCostos = this.costoServicios.reduce(function(prev, cur){
            return prev + cur.costo;
        }, 0);

        this.totalPagos = this.pagos.reduce(function(prev, cur){
            return prev + cur.cantidad;
        }, 0);
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.eventSubscriber = this.route.params.subscribe((params) => {
            this.idTramite = params['id'];
            this.tiposervicio = params['tiposervicio'];
        });

        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCostoServicios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CostoServicio) {
        return item.id;
    }

    trackIdPagos(index: number, item: Pagos) {
        return item.id;
    }

    registerChangeInCostoServicios() {
        this.eventSubscriber = this.eventManager.subscribe('costoServicioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
