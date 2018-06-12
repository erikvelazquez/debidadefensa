import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ParteMySuffix } from './parte-my-suffix.model';
import { ParteMySuffixService } from './parte-my-suffix.service';

@Component({
    selector: 'jhi-parte-my-suffix-detail',
    templateUrl: './parte-my-suffix-detail.component.html'
})
export class ParteMySuffixDetailComponent implements OnInit, OnDestroy {

    parte: ParteMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private parteService: ParteMySuffixService,
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
            .subscribe((parteResponse: HttpResponse<ParteMySuffix>) => {
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
