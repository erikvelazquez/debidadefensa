import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CostoServicio } from './costo-servicio.model';
import { CostoServicioService } from './costo-servicio.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-costo-servicio',
    templateUrl: './costo-servicio.component.html'
})
export class CostoServicioComponent implements OnInit, OnDestroy {
costoServicios: CostoServicio[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private costoServicioService: CostoServicioService,
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
            this.costoServicioService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<CostoServicio[]>) => this.costoServicios = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.costoServicioService.query().subscribe(
            (res: HttpResponse<CostoServicio[]>) => {
                this.costoServicios = res.body;
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
        this.registerChangeInCostoServicios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CostoServicio) {
        return item.id;
    }
    registerChangeInCostoServicios() {
        this.eventSubscriber = this.eventManager.subscribe('costoServicioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
