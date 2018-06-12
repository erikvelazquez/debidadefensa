import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ParteMySuffix } from './parte-my-suffix.model';
import { ParteMySuffixService } from './parte-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-parte-my-suffix',
    templateUrl: './parte-my-suffix.component.html'
})
export class ParteMySuffixComponent implements OnInit, OnDestroy {
partes: ParteMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private parteService: ParteMySuffixService,
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
            this.parteService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<ParteMySuffix[]>) => this.partes = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.parteService.query().subscribe(
            (res: HttpResponse<ParteMySuffix[]>) => {
                this.partes = res.body;
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
        this.registerChangeInPartes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ParteMySuffix) {
        return item.id;
    }
    registerChangeInPartes() {
        this.eventSubscriber = this.eventManager.subscribe('parteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
