import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoServicio } from './tipo-servicio.model';
import { TipoServicioService } from './tipo-servicio.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tipo-servicio',
    templateUrl: './tipo-servicio.component.html',
    styleUrls: [
        '../../app.scss'
    ]
})
export class TipoServicioComponent implements OnInit, OnDestroy {
tipoServicios: TipoServicio[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tipoServicioService: TipoServicioService,
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
            this.tipoServicioService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<TipoServicio[]>) => this.tipoServicios = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.tipoServicioService.query().subscribe(
            (res: HttpResponse<TipoServicio[]>) => {
                this.tipoServicios = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        this.registerChangeInTipoServicios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TipoServicio) {
        return item.id;
    }
    registerChangeInTipoServicios() {
        this.eventSubscriber = this.eventManager.subscribe('tipoServicioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
