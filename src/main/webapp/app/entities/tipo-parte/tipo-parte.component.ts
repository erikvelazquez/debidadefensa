import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoParte } from './tipo-parte.model';
import { TipoParteService } from './tipo-parte.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-tipo-parte',
    templateUrl: './tipo-parte.component.html',
    styleUrls: [
        '../../app.scss'
    ]
})
export class TipoParteComponent implements OnInit, OnDestroy {
tipoPartes: TipoParte[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tipoParteService: TipoParteService,
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
                    (res: HttpResponse<TipoParte[]>) => this.tipoPartes = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.tipoParteService.query().subscribe(
            (res: HttpResponse<TipoParte[]>) => {
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

    trackId(index: number, item: TipoParte) {
        return item.id;
    }
    registerChangeInTipoPartes() {
        this.eventSubscriber = this.eventManager.subscribe('tipoParteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
