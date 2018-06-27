import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteGeneral } from './tramite-general.model';
import { TramiteGeneralService } from './tramite-general.service';

@Component({
    selector: 'jhi-tramite-general-detail',
    templateUrl: './tramite-general-detail.component.html'
})
export class TramiteGeneralDetailComponent implements OnInit, OnDestroy {

    tramiteGeneral: TramiteGeneral;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tramiteGeneralService: TramiteGeneralService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTramiteGenerals();
    }

    load(id) {
        this.tramiteGeneralService.find(id)
            .subscribe((tramiteGeneralResponse: HttpResponse<TramiteGeneral>) => {
                this.tramiteGeneral = tramiteGeneralResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTramiteGenerals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tramiteGeneralListModification',
            (response) => this.load(this.tramiteGeneral.id)
        );
    }
}
