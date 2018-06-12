import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EstatusMySuffix } from './estatus-my-suffix.model';
import { EstatusMySuffixService } from './estatus-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-estatus-my-suffix',
    templateUrl: './estatus-my-suffix.component.html'
})
export class EstatusMySuffixComponent implements OnInit, OnDestroy {
estatuses: EstatusMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private estatusService: EstatusMySuffixService,
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
            this.estatusService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<EstatusMySuffix[]>) => this.estatuses = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.estatusService.query().subscribe(
            (res: HttpResponse<EstatusMySuffix[]>) => {
                this.estatuses = res.body;
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
        this.registerChangeInEstatuses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: EstatusMySuffix) {
        return item.id;
    }
    registerChangeInEstatuses() {
        this.eventSubscriber = this.eventManager.subscribe('estatusListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
