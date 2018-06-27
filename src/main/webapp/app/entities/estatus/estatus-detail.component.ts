import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Estatus } from './estatus.model';
import { EstatusService } from './estatus.service';

@Component({
    selector: 'jhi-estatus-detail',
    templateUrl: './estatus-detail.component.html'
})
export class EstatusDetailComponent implements OnInit, OnDestroy {

    estatus: Estatus;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estatusService: EstatusService,
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
            .subscribe((estatusResponse: HttpResponse<Estatus>) => {
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
