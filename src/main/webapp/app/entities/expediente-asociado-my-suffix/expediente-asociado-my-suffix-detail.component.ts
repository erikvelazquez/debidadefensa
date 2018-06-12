import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ExpedienteAsociadoMySuffix } from './expediente-asociado-my-suffix.model';
import { ExpedienteAsociadoMySuffixService } from './expediente-asociado-my-suffix.service';

@Component({
    selector: 'jhi-expediente-asociado-my-suffix-detail',
    templateUrl: './expediente-asociado-my-suffix-detail.component.html'
})
export class ExpedienteAsociadoMySuffixDetailComponent implements OnInit, OnDestroy {

    expedienteAsociado: ExpedienteAsociadoMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private expedienteAsociadoService: ExpedienteAsociadoMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInExpedienteAsociados();
    }

    load(id) {
        this.expedienteAsociadoService.find(id)
            .subscribe((expedienteAsociadoResponse: HttpResponse<ExpedienteAsociadoMySuffix>) => {
                this.expedienteAsociado = expedienteAsociadoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExpedienteAsociados() {
        this.eventSubscriber = this.eventManager.subscribe(
            'expedienteAsociadoListModification',
            (response) => this.load(this.expedienteAsociado.id)
        );
    }
}
