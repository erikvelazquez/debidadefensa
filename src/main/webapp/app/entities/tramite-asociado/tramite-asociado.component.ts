import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TramiteAsociado } from './tramite-asociado.model';
import { TramiteAsociadoService } from './tramite-asociado.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tramite-asociado',
    templateUrl: './tramite-asociado.component.html'
})
export class TramiteAsociadoComponent implements OnInit, OnDestroy {
tramiteAsociados: TramiteAsociado[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tramiteAsociadoService: TramiteAsociadoService,
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
            this.tramiteAsociadoService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<TramiteAsociado[]>) => this.tramiteAsociados = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.tramiteAsociadoService.query().subscribe(
            (res: HttpResponse<TramiteAsociado[]>) => {
                this.tramiteAsociados = res.body;
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
        this.registerChangeInTramiteAsociados();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TramiteAsociado) {
        return item.id;
    }
    registerChangeInTramiteAsociados() {
        this.eventSubscriber = this.eventManager.subscribe('tramiteAsociadoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
