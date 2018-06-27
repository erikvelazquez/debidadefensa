import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ExpedienteAsociado } from './expediente-asociado.model';
import { ExpedienteAsociadoService } from './expediente-asociado.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-expediente-asociado',
    templateUrl: './expediente-asociado.component.html'
})
export class ExpedienteAsociadoComponent implements OnInit, OnDestroy {
expedienteAsociados: ExpedienteAsociado[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private expedienteAsociadoService: ExpedienteAsociadoService,
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
            this.expedienteAsociadoService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ExpedienteAsociado[]>) => this.expedienteAsociados = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.expedienteAsociadoService.query().subscribe(
            (res: HttpResponse<ExpedienteAsociado[]>) => {
                this.expedienteAsociados = res.body;
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
        this.registerChangeInExpedienteAsociados();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ExpedienteAsociado) {
        return item.id;
    }
    registerChangeInExpedienteAsociados() {
        this.eventSubscriber = this.eventManager.subscribe('expedienteAsociadoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
