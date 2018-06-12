import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TipoParteMySuffix } from './tipo-parte-my-suffix.model';
import { TipoParteMySuffixService } from './tipo-parte-my-suffix.service';

@Component({
    selector: 'jhi-tipo-parte-my-suffix-detail',
    templateUrl: './tipo-parte-my-suffix-detail.component.html'
})
export class TipoParteMySuffixDetailComponent implements OnInit, OnDestroy {

    tipoParte: TipoParteMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoParteService: TipoParteMySuffixService,
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
            .subscribe((tipoParteResponse: HttpResponse<TipoParteMySuffix>) => {
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
