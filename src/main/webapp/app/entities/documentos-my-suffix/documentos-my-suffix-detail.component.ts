import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentosMySuffix } from './documentos-my-suffix.model';
import { DocumentosMySuffixService } from './documentos-my-suffix.service';

@Component({
    selector: 'jhi-documentos-my-suffix-detail',
    templateUrl: './documentos-my-suffix-detail.component.html'
})
export class DocumentosMySuffixDetailComponent implements OnInit, OnDestroy {

    documentos: DocumentosMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private documentosService: DocumentosMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDocumentos();
    }

    load(id) {
        this.documentosService.find(id)
            .subscribe((documentosResponse: HttpResponse<DocumentosMySuffix>) => {
                this.documentos = documentosResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDocumentos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'documentosListModification',
            (response) => this.load(this.documentos.id)
        );
    }
}
