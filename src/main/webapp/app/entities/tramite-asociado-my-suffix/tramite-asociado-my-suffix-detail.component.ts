import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteAsociadoMySuffix } from './tramite-asociado-my-suffix.model';
import { TramiteAsociadoMySuffixService } from './tramite-asociado-my-suffix.service';

@Component({
    selector: 'jhi-tramite-asociado-my-suffix-detail',
    templateUrl: './tramite-asociado-my-suffix-detail.component.html'
})
export class TramiteAsociadoMySuffixDetailComponent implements OnInit, OnDestroy {

    tramiteAsociado: TramiteAsociadoMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tramiteAsociadoService: TramiteAsociadoMySuffixService,
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
            .subscribe((tramiteAsociadoResponse: HttpResponse<TramiteAsociadoMySuffix>) => {
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
