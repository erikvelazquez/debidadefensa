import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DocumentosMySuffix } from './documentos-my-suffix.model';
import { DocumentosMySuffixService } from './documentos-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-documentos-my-suffix',
    templateUrl: './documentos-my-suffix.component.html'
})
export class DocumentosMySuffixComponent implements OnInit, OnDestroy {
documentos: DocumentosMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private documentosService: DocumentosMySuffixService,
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
            this.documentosService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: HttpResponse<DocumentosMySuffix[]>) => this.documentos = res.body,
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
       }
        this.documentosService.query().subscribe(
            (res: HttpResponse<DocumentosMySuffix[]>) => {
                this.documentos = res.body;
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
        this.registerChangeInDocumentos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DocumentosMySuffix) {
        return item.id;
    }
    registerChangeInDocumentos() {
        this.eventSubscriber = this.eventManager.subscribe('documentosListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
