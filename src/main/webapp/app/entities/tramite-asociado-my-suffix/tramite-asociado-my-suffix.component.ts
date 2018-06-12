import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TramiteAsociadoMySuffix } from './tramite-asociado-my-suffix.model';
import { TramiteAsociadoMySuffixService } from './tramite-asociado-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tramite-asociado-my-suffix',
    templateUrl: './tramite-asociado-my-suffix.component.html'
})
export class TramiteAsociadoMySuffixComponent implements OnInit, OnDestroy {
tramiteAsociados: TramiteAsociadoMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tramiteAsociadoService: TramiteAsociadoMySuffixService,
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
                    (res: HttpResponse<TramiteAsociadoMySuffix[]>) => this.tramiteAsociados = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.tramiteAsociadoService.query().subscribe(
            (res: HttpResponse<TramiteAsociadoMySuffix[]>) => {
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

    trackId(index: number, item: TramiteAsociadoMySuffix) {
        return item.id;
    }
    registerChangeInTramiteAsociados() {
        this.eventSubscriber = this.eventManager.subscribe('tramiteAsociadoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
