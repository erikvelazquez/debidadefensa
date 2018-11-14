import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Router } from '@angular/router';
import { FechasServicio } from './fechas-servicio.model';
import { FechasServicioService } from './fechas-servicio.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-fechas-servicio',
    templateUrl: './fechas-servicio.component.html',
    styleUrls: [
        '../../app.scss'
    ]
})
export class FechasServicioComponent implements OnInit, OnDestroy {
fechasServicios: FechasServicio[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private fechasServicioService: FechasServicioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private router: Router,
    ) {
        this.currentSearch = this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ?
            this.activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.fechasServicioService.search({
                query: this.currentSearch + '*',
                }).subscribe(
                    (res: HttpResponse<FechasServicio[]>) => this.fechasServicios = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       } else {
            const viewDate = new Date();
            this.fechasServicioService.findByMonth(viewDate.getMonth() + 1, viewDate.getFullYear() ).subscribe(
                (res: HttpResponse<FechasServicio[]>) => {
                    this.fechasServicios = res.body;
                    this.currentSearch = '';
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFechasServicios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FechasServicio) {
        return item.id;
    }
    registerChangeInFechasServicios() {
        this.eventSubscriber = this.eventManager.subscribe('fechasServicioListModification', (response) => this.loadAll());
    }

    abrelink(item: FechasServicio) {
        let url = '';
        let id = 0;
        switch (item.tipoServicioId) {
            case 1001: {
                // Expediente;
                url = '../expediente';
                id =  item.expedienteId;
                break;
            }
            case 1002: {
                // Migratorio;
                url = '../tramite-migratorio';
                id =  item.tramiteMigratorioId;
                break;
            }
            case 1003: {
                // General;
                url = '../tramite-general';
                id =  item.tramiteGeneralId;
                break;
            }
            default: {
              // statements;
              break;
            }
        }

        if (url !== '') {
          this.router.navigate([url, id, true ]).then(() => {
            this.clear();
          });
        } else {
          url = '../fechas-servicio/';
          // [routerLink]="['/', { outlets: { popup: 'fechas-servicio/'+ fechasServicio.id + '/edit'} }]"
          this.router.navigate(['/', { outlets: { popup: ['fechas-servicio', item.id, 'edit' ] } }], { skipLocationChange: true }).then(() => {
          // this.router.navigate(['../fechas-servicio/', item.id, 'edit' ]).then(() => {
            this.clear();
          });
        }
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
