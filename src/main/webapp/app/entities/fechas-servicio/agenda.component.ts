import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter
} from 'angular-calendar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService } from 'ng-jhipster';

import { FechasServicio } from './fechas-servicio.model';
import { FechasServicioPopupService } from './fechas-servicio-popup.service';
import { FechasServicioService } from './fechas-servicio.service';
import { HttpResponse, HttpErrorResponse } from '../../../../../../node_modules/@angular/common/http';
import { CustomDateFormatter } from '../../services/fecha.service';
import { Router } from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
    selector: 'jhi-agenda',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './agenda.component.html',
    providers: [
      {
        provide: CalendarDateFormatter,
        useClass: CustomDateFormatter
      }
    ]
})
export class AgendaComponent {

    fechasServicio: FechasServicio;
    view = 'month';
    viewDate: Date = new Date();
    refresh: Subject<any> = new Subject();
    fechasServicios: FechasServicio[];
    events: CalendarEvent[] = [];
    activeDayIsOpen = true;
    constructor(
        private jhiAlertService: JhiAlertService,
        private fechasServicioService: FechasServicioService,
        public activeModal: NgbActiveModal,
        private router: Router,
    ) {
      this.cargaFechas();
    }

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      if (isSameMonth(date, this.viewDate)) {

       // this.cargaFechas(2);
       if (
          (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
          events.length === 0
        ) {
          this.activeDayIsOpen = false;
        } else {
          this.activeDayIsOpen = true;
          this.viewDate = date;
        }
      }
    }

    eventClicked({event}: CalendarEventTimesChangedEvent): void {
      this.fechasServicioService.find(+event.id).subscribe(
          (res: HttpResponse<FechasServicio>) => {

            let url = '';
            let id = 0;
            // "['/expediente', expediente.id, esGeneral]"
            // "['/tramite-general', tramiteGeneral.id, esGeneral ]"
            // "['/tramite-migratorio', tramiteMigratorio.id, esGeneral ]"
            switch (res.body.tipoServicioId) {
                case 1001: {
                    // Expediente;
                    url = '../expediente';
                    id =  res.body.expedienteId;
                    break;
                }
                case 1002: {
                    // Migratorio;
                    url = '../tramite-migratorio';
                    id =  res.body.tramiteMigratorioId;
                    break;
                }
                case 1003: {
                    // General;
                    url = '../tramite-general';
                    id =  res.body.tramiteGeneralId;
                    break;
                }
                default: {
                  // statements;
                  break;
                }
            }
            this.router.navigate([url, id, true ]).then(() => {
               this.clear();
            });
            // alert(res.body.descripcion);
          },
          (res: HttpErrorResponse) => this.onError(res.message)
      );
    }

    eventTimesChanged({
      event,
      newStart,
      newEnd
    }: CalendarEventTimesChangedEvent): void {
      event.start = newStart;
      event.end = newEnd;
     // this.handleEvent('Dropped or resized', event);
      this.refresh.next();
    }

    cargaFechas() {
      const month = this.viewDate.getMonth();
      const year = this.viewDate.getFullYear();
      this.fechasServicioService.findByMonth(month + 1, year).subscribe(
          (res: HttpResponse<FechasServicio[]>) => this.onSuccess(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
      );
    }

    private onSuccess(fechas: FechasServicio[]) {
      this.fechasServicios = fechas;
      this.events = new Array<CalendarEvent>();

      for (const i of this.fechasServicios) {
          const fec = new Date(i.fecha);
          this.events.push({
            start: fec,
            title: fec.getHours() + ':' + (fec.getMinutes() < 10 ? '0' : '') + fec.getMinutes() + ' ' + i.descripcion + ' - ' + i.observaciones,
            color: colors.blue,
            id: i.id
          });
      }

      this.refresh.next();
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}

@Component({
    selector: 'jhi-agenda-popup',
    template: ''
})
export class AgendaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private fechasServicioPopupService: FechasServicioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.fechasServicioPopupService
                .open(AgendaComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
