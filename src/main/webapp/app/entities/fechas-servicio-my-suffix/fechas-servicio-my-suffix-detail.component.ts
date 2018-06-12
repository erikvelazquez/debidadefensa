import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FechasServicioMySuffix } from './fechas-servicio-my-suffix.model';
import { FechasServicioMySuffixService } from './fechas-servicio-my-suffix.service';

@Component({
    selector: 'jhi-fechas-servicio-my-suffix-detail',
    templateUrl: './fechas-servicio-my-suffix-detail.component.html'
})
export class FechasServicioMySuffixDetailComponent implements OnInit, OnDestroy {

    fechasServicio: FechasServicioMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private fechasServicioService: FechasServicioMySuffixService,
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
            .subscribe((fechasServicioResponse: HttpResponse<FechasServicioMySuffix>) => {
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
