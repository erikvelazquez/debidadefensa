import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

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
        private principal: Principal
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

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
