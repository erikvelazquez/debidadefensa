import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CostoServicio } from './costo-servicio.model';
import { CostoServicioService } from './costo-servicio.service';
import { Principal } from '../../shared';
import { Cliente, ClienteService } from '../cliente';
import { Pagos, PagosService } from '../pagos';

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

    private subscription: Subscription;

    constructor(
        private costoServicioService: CostoServicioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private pagosService: PagosService,
        private route: ActivatedRoute,
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        this.totalCostos = 0;
        this.totalPagos = 0;    
       
       this.costoServicioService.findByMigratorio(this.idTramite)
        .subscribe((res: HttpResponse<CostoServicio[]>) => {
            this.costoServicios = res.body;
            this.totalCostos = this.costoServicios.reduce(function(prev, cur){
                return prev + cur.costo;
            },0);
        },(res: HttpErrorResponse) => this.onError(res.message));
        

        this.pagosService.findByMigratorio(this.idTramite)
        .subscribe(
            (res: HttpResponse<Pagos[]>) => {
                this.pagos = res.body;
                this.totalPagos = this.pagos.reduce(function(prev, cur){
                    return prev + cur.cantidad;
                },0);   
        },(res: HttpErrorResponse) => this.onError(res.message));
    }
   
    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.idTramite = params["id"];
            this.tiposervicio = params["tiposervicio"];
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

    registerChangeInPagos() {
        this.eventSubscriber = this.eventManager.subscribe('pagosListModification', (response) => this.loadAll());
    }
    
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
