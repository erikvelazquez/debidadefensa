import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { EstatusMySuffix } from './estatus-my-suffix.model';
import { EstatusMySuffixService } from './estatus-my-suffix.service';

@Component({
    selector: 'jhi-estatus-my-suffix-detail',
    templateUrl: './estatus-my-suffix-detail.component.html'
})
export class EstatusMySuffixDetailComponent implements OnInit, OnDestroy {

    estatus: EstatusMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estatusService: EstatusMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstatuses();
    }

    load(id) {
        this.estatusService.find(id)
            .subscribe((estatusResponse: HttpResponse<EstatusMySuffix>) => {
                this.estatus = estatusResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstatuses() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estatusListModification',
            (response) => this.load(this.estatus.id)
        );
    }
}
