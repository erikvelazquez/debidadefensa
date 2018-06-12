import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoParteMySuffix } from './tipo-parte-my-suffix.model';
import { TipoParteMySuffixService } from './tipo-parte-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tipo-parte-my-suffix',
    templateUrl: './tipo-parte-my-suffix.component.html'
})
export class TipoParteMySuffixComponent implements OnInit, OnDestroy {
tipoPartes: TipoParteMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tipoParteService: TipoParteMySuffixService,
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
            this.tipoParteService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<TipoParteMySuffix[]>) => this.tipoPartes = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.tipoParteService.query().subscribe(
            (res: HttpResponse<TipoParteMySuffix[]>) => {
                this.tipoPartes = res.body;
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
        this.registerChangeInTipoPartes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TipoParteMySuffix) {
        return item.id;
    }
    registerChangeInTipoPartes() {
        this.eventSubscriber = this.eventManager.subscribe('tipoParteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
