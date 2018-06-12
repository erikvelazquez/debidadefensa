import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TipoServicioMySuffix } from './tipo-servicio-my-suffix.model';
import { TipoServicioMySuffixService } from './tipo-servicio-my-suffix.service';

@Component({
    selector: 'jhi-tipo-servicio-my-suffix-detail',
    templateUrl: './tipo-servicio-my-suffix-detail.component.html'
})
export class TipoServicioMySuffixDetailComponent implements OnInit, OnDestroy {

    tipoServicio: TipoServicioMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoServicioService: TipoServicioMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoServicios();
    }

    load(id) {
        this.tipoServicioService.find(id)
            .subscribe((tipoServicioResponse: HttpResponse<TipoServicioMySuffix>) => {
                this.tipoServicio = tipoServicioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoServicios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoServicioListModification',
            (response) => this.load(this.tipoServicio.id)
        );
    }
}
