import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { PagosMySuffix } from './pagos-my-suffix.model';
import { PagosMySuffixService } from './pagos-my-suffix.service';

@Component({
    selector: 'jhi-pagos-my-suffix-detail',
    templateUrl: './pagos-my-suffix-detail.component.html'
})
export class PagosMySuffixDetailComponent implements OnInit, OnDestroy {

    pagos: PagosMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pagosService: PagosMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPagos();
    }

    load(id) {
        this.pagosService.find(id)
            .subscribe((pagosResponse: HttpResponse<PagosMySuffix>) => {
                this.pagos = pagosResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPagos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pagosListModification',
            (response) => this.load(this.pagos.id)
        );
    }
}
