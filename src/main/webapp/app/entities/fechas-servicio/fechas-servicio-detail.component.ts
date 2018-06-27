import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FechasServicio } from './fechas-servicio.model';
import { FechasServicioService } from './fechas-servicio.service';

@Component({
    selector: 'jhi-fechas-servicio-detail',
    templateUrl: './fechas-servicio-detail.component.html'
})
export class FechasServicioDetailComponent implements OnInit, OnDestroy {

    fechasServicio: FechasServicio;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fechasServicioService: FechasServicioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFechasServicios();
    }

    load(id) {
        this.fechasServicioService.find(id)
            .subscribe((fechasServicioResponse: HttpResponse<FechasServicio>) => {
                this.fechasServicio = fechasServicioResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFechasServicios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'fechasServicioListModification',
            (response) => this.load(this.fechasServicio.id)
        );
    }
}
