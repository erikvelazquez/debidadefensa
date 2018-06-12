import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PagosMySuffix } from './pagos-my-suffix.model';
import { PagosMySuffixService } from './pagos-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-pagos-my-suffix',
    templateUrl: './pagos-my-suffix.component.html'
})
export class PagosMySuffixComponent implements OnInit, OnDestroy {
pagos: PagosMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private pagosService: PagosMySuffixService,
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
            this.pagosService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<PagosMySuffix[]>) => this.pagos = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.pagosService.query().subscribe(
            (res: HttpResponse<PagosMySuffix[]>) => {
                this.pagos = res.body;
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
        this.registerChangeInPagos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PagosMySuffix) {
        return item.id;
    }
    registerChangeInPagos() {
        this.eventSubscriber = this.eventManager.subscribe('pagosListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
