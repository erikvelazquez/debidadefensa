import { Component, OnInit, OnDestroy,
        ChangeDetectionStrategy,
        ViewChild,
        TemplateRef } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FechasServicio } from './fechas-servicio.model';
import { FechasServicioPopupService } from './fechas-servicio-popup.service';
import { FechasServicioService } from './fechas-servicio.service';
import { HttpResponse, HttpErrorResponse } from '../../../../../../node_modules/@angular/common/http';


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
    templateUrl: './agenda.component.html'
})
export class AgendaComponent {

    fechasServicio: FechasServicio;
    view: string = 'month';  
    viewDate: Date = new Date();  
    refresh: Subject<any> = new Subject();
    fechasServicios: FechasServicio[];

    events: CalendarEvent[] = [];
  
    activeDayIsOpen: boolean = true;
  
    constructor(
        private jhiAlertService: JhiAlertService,
        private fechasServicioService: FechasServicioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private modal: NgbModal
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
  
    cargaFechas(){
      let month = this.viewDate.getMonth();
      let year = this.viewDate.getFullYear();
      this.fechasServicioService.findByMonth(month + 1, year).subscribe(        
          (res: HttpResponse<FechasServicio[]>) => this.onSuccess(res.body),
          (res: HttpErrorResponse) => this.onError(res.message)
      );
    }

    private onSuccess(fechas: FechasServicio[]){
      this.fechasServicios = fechas;
      this.events = new Array<CalendarEvent>();

      for(let i of this.fechasServicios){
        let fec = new Date(i.fecha);
        this.events.push({
          start: fec,
          title: fec.getHours() + ':' + (fec.getMinutes()<10?'0':'') + fec.getMinutes() + ' ' + i.descripcion,
          color: colors.blue,

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
