import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TipoParte } from './tipo-parte.model';
import { TipoParteService } from './tipo-parte.service';

@Component({
    selector: 'jhi-tipo-parte-detail',
    templateUrl: './tipo-parte-detail.component.html'
})
export class TipoParteDetailComponent implements OnInit, OnDestroy {

    tipoParte: TipoParte;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoParteService: TipoParteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoPartes();
    }

    load(id) {
        this.tipoParteService.find(id)
            .subscribe((tipoParteResponse: HttpResponse<TipoParte>) => {
                this.tipoParte = tipoParteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoPartes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoParteListModification',
            (response) => this.load(this.tipoParte.id)
        );
    }
}
