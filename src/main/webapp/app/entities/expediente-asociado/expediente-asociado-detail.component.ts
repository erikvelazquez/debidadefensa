import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ExpedienteAsociado } from './expediente-asociado.model';
import { ExpedienteAsociadoService } from './expediente-asociado.service';

@Component({
    selector: 'jhi-expediente-asociado-detail',
    templateUrl: './expediente-asociado-detail.component.html'
})
export class ExpedienteAsociadoDetailComponent implements OnInit, OnDestroy {

    expedienteAsociado: ExpedienteAsociado;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private expedienteAsociadoService: ExpedienteAsociadoService,
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
            .subscribe((expedienteAsociadoResponse: HttpResponse<ExpedienteAsociado>) => {
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
