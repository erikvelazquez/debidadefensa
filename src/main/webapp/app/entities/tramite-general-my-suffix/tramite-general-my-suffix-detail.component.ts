import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TramiteGeneralMySuffix } from './tramite-general-my-suffix.model';
import { TramiteGeneralMySuffixService } from './tramite-general-my-suffix.service';

@Component({
    selector: 'jhi-tramite-general-my-suffix-detail',
    templateUrl: './tramite-general-my-suffix-detail.component.html'
})
export class TramiteGeneralMySuffixDetailComponent implements OnInit, OnDestroy {

    tramiteGeneral: TramiteGeneralMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tramiteGeneralService: TramiteGeneralMySuffixService,
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
            .subscribe((tramiteGeneralResponse: HttpResponse<TramiteGeneralMySuffix>) => {
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
