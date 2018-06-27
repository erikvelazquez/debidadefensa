import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Parte } from './parte.model';
import { ParteService } from './parte.service';

@Component({
    selector: 'jhi-parte-detail',
    templateUrl: './parte-detail.component.html'
})
export class ParteDetailComponent implements OnInit, OnDestroy {

    parte: Parte;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private parteService: ParteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPartes();
    }

    load(id) {
        this.parteService.find(id)
            .subscribe((parteResponse: HttpResponse<Parte>) => {
                this.parte = parteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPartes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'parteListModification',
            (response) => this.load(this.parte.id)
        );
    }
}
