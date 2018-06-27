import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Pagos } from './pagos.model';
import { PagosService } from './pagos.service';

@Component({
    selector: 'jhi-pagos-detail',
    templateUrl: './pagos-detail.component.html'
})
export class PagosDetailComponent implements OnInit, OnDestroy {

    pagos: Pagos;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private pagosService: PagosService,
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
            .subscribe((pagosResponse: HttpResponse<Pagos>) => {
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
