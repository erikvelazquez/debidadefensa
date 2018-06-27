import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Documentos } from './documentos.model';
import { DocumentosService } from './documentos.service';

@Component({
    selector: 'jhi-documentos-detail',
    templateUrl: './documentos-detail.component.html'
})
export class DocumentosDetailComponent implements OnInit, OnDestroy {

    documentos: Documentos;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private documentosService: DocumentosService,
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
            .subscribe((documentosResponse: HttpResponse<Documentos>) => {
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
