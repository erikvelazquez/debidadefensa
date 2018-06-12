import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ExpedienteMySuffix } from './expediente-my-suffix.model';
import { ExpedienteMySuffixService } from './expediente-my-suffix.service';

@Component({
    selector: 'jhi-expediente-my-suffix-detail',
    templateUrl: './expediente-my-suffix-detail.component.html'
})
export class ExpedienteMySuffixDetailComponent implements OnInit, OnDestroy {

    expediente: ExpedienteMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private expedienteService: ExpedienteMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInExpedientes();
    }

    load(id) {
        this.expedienteService.find(id)
            .subscribe((expedienteResponse: HttpResponse<ExpedienteMySuffix>) => {
                this.expediente = expedienteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExpedientes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'expedienteListModification',
            (response) => this.load(this.expediente.id)
        );
    }
}
