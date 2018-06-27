import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteAsociado } from './tramite-asociado.model';
import { TramiteAsociadoService } from './tramite-asociado.service';

@Component({
    selector: 'jhi-tramite-asociado-detail',
    templateUrl: './tramite-asociado-detail.component.html'
})
export class TramiteAsociadoDetailComponent implements OnInit, OnDestroy {

    tramiteAsociado: TramiteAsociado;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tramiteAsociadoService: TramiteAsociadoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTramiteAsociados();
    }

    load(id) {
        this.tramiteAsociadoService.find(id)
            .subscribe((tramiteAsociadoResponse: HttpResponse<TramiteAsociado>) => {
                this.tramiteAsociado = tramiteAsociadoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTramiteAsociados() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tramiteAsociadoListModification',
            (response) => this.load(this.tramiteAsociado.id)
        );
    }
}
