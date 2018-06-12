import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ClienteMySuffix } from './cliente-my-suffix.model';
import { ClienteMySuffixService } from './cliente-my-suffix.service';

@Component({
    selector: 'jhi-cliente-my-suffix-detail',
    templateUrl: './cliente-my-suffix-detail.component.html'
})
export class ClienteMySuffixDetailComponent implements OnInit, OnDestroy {

    cliente: ClienteMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private clienteService: ClienteMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClientes();
    }

    load(id) {
        this.clienteService.find(id)
            .subscribe((clienteResponse: HttpResponse<ClienteMySuffix>) => {
                this.cliente = clienteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClientes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clienteListModification',
            (response) => this.load(this.cliente.id)
        );
    }
}
