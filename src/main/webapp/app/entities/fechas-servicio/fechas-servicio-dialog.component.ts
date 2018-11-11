import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FechasServicio } from './fechas-servicio.model';
import { FechasServicioPopupService } from './fechas-servicio-popup.service';
import { FechasServicioService } from './fechas-servicio.service';
import { Expediente, ExpedienteService } from '../expediente';
import { TramiteMigratorio, TramiteMigratorioService } from '../tramite-migratorio';
import { TramiteGeneral, TramiteGeneralService } from '../tramite-general';
import { TipoServicio, TipoServicioService } from '../tipo-servicio';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
    'fr': {
      weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
      months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
    }
    // other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
  language = 'fr';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
    selector: 'jhi-fechas-servicio-dialog',
    templateUrl: './fechas-servicio-dialog.component.html',
    styleUrls: [
        '../../app.scss'
    ],
    providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class FechasServicioDialogComponent implements OnInit {

    fechasServicio: FechasServicio;
    isSaving: boolean;

    expedientes: Expediente[];
    isGeneral: boolean;

    tramitemigratorios: TramiteMigratorio[];

    tramitegenerals: TramiteGeneral[];
    date: Date;
    tiposervicios: TipoServicio[];
    fechaDp: any;
    isLoading: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private fechasServicioService: FechasServicioService,
        private expedienteService: ExpedienteService,
        private tramiteMigratorioService: TramiteMigratorioService,
        private tramiteGeneralService: TramiteGeneralService,
        private tipoServicioService: TipoServicioService,
        private eventManager: JhiEventManager,
    ) {
        this.isLoading = false;
    }

    ngOnInit() {
        this.isSaving = false;
        this.date = new Date();
        this.isGeneral = isNaN(this.fechasServicio.tipoServicioId) ||  this.fechasServicio.tipoServicioId === null ? true : false;
        this.expedienteService.query()
            .subscribe((res: HttpResponse<Expediente[]>) => { this.expedientes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tramiteMigratorioService.query()
            .subscribe((res: HttpResponse<TramiteMigratorio[]>) => { this.tramitemigratorios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tramiteGeneralService.query()
            .subscribe((res: HttpResponse<TramiteGeneral[]>) => { this.tramitegenerals = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.tipoServicioService.query()
            .subscribe((res: HttpResponse<TipoServicio[]>) => { this.tiposervicios = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.isLoading = true;
        if (this.fechasServicio.id !== null) {
            this.subscribeToSaveResponse(
                this.fechasServicioService.update(this.fechasServicio));
        } else {
            this.subscribeToSaveResponse(
                this.fechasServicioService.create(this.fechasServicio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FechasServicio>>) {
        result.subscribe((res: HttpResponse<FechasServicio>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FechasServicio) {
        this.isLoading = false;
        if (!this.isGeneral) {
            switch (result.tipoServicioId) {
                case 1001: {
                    // Expediente
                    this.eventManager.broadcast({ name: 'expedienteListModification', content: 'OK'});
                    this.eventManager.broadcast({ name: 'fechasServicioListModification', content: 'OK'});
                    break;
                }
                case 1002: {
                    // Migratorio
                    this.eventManager.broadcast({ name: 'tramiteMigratorioListModification', content: 'OK'});
                    this.eventManager.broadcast({ name: 'fechasServicioListModification', content: 'OK'});
                    break;
                }
                case 1003: {
                    // General
                    this.eventManager.broadcast({ name: 'tramiteGeneralListModification', content: 'OK'});
                    this.eventManager.broadcast({ name: 'fechasServicioListModification', content: 'OK'});
                    break;
                }
                default: {
                    this.eventManager.broadcast({ name: 'fechasServicioListModification', content: 'OK'});
                break;
                }
            }
        } else {
            this.eventManager.broadcast({ name: 'fechasServicioListModification', content: 'OK'});
        }

        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isLoading = false;
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackExpedienteById(index: number, item: Expediente) {
        return item.id;
    }

    trackTramiteMigratorioById(index: number, item: TramiteMigratorio) {
        return item.id;
    }

    trackTramiteGeneralById(index: number, item: TramiteGeneral) {
        return item.id;
    }

    trackTipoServicioById(index: number, item: TipoServicio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-fechas-servicio-popup',
    template: ''
})
export class FechasServicioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fechasServicioPopupService: FechasServicioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.fechasServicioPopupService
                    .open(FechasServicioDialogComponent as Component,  params['idTramite'],  params['tiposervicio'], params['id']);
            } else {
                this.fechasServicioPopupService
                    .open(FechasServicioDialogComponent as Component,  params['idTramite'],  params['tiposervicio']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
