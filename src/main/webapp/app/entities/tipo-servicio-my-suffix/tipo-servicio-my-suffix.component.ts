import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoServicioMySuffix } from './tipo-servicio-my-suffix.model';
import { TipoServicioMySuffixService } from './tipo-servicio-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tipo-servicio-my-suffix',
    templateUrl: './tipo-servicio-my-suffix.component.html'
})
export class TipoServicioMySuffixComponent implements OnInit, OnDestroy {
tipoServicios: TipoServicioMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tipoServicioService: TipoServicioMySuffixService,
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
                    (res: HttpResponse<TipoServicioMySuffix[]>) => this.tipoServicios = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.tipoServicioService.query().subscribe(
            (res: HttpResponse<TipoServicioMySuffix[]>) => {
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

    trackId(index: number, item: TipoServicioMySuffix) {
        return item.id;
    }
    registerChangeInTipoServicios() {
        this.eventSubscriber = this.eventManager.subscribe('tipoServicioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
