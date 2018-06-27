import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TipoServicio } from './tipo-servicio.model';
import { TipoServicioService } from './tipo-servicio.service';

@Component({
    selector: 'jhi-tipo-servicio-detail',
    templateUrl: './tipo-servicio-detail.component.html'
})
export class TipoServicioDetailComponent implements OnInit, OnDestroy {

    tipoServicio: TipoServicio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoServicioService: TipoServicioService,
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
            .subscribe((tipoServicioResponse: HttpResponse<TipoServicio>) => {
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
