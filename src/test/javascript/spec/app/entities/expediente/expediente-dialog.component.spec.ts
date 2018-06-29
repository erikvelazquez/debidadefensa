/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { ExpedienteDialogComponent } from '../../../../../../main/webapp/app/entities/expediente/expediente-dialog.component';
import { ExpedienteService } from '../../../../../../main/webapp/app/entities/expediente/expediente.service';
import { Expediente } from '../../../../../../main/webapp/app/entities/expediente/expediente.model';
import { ClienteService } from '../../../../../../main/webapp/app/entities/cliente';
import { EstatusService } from '../../../../../../main/webapp/app/entities/estatus';
import { TipoServicioService } from '../../../../../../main/webapp/app/entities/tipo-servicio';

describe('Component Tests', () => {

    describe('Expediente Management Dialog Component', () => {
        let comp: ExpedienteDialogComponent;
        let fixture: ComponentFixture<ExpedienteDialogComponent>;
        let service: ExpedienteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ExpedienteDialogComponent],
                providers: [
                    ClienteService,
                    EstatusService,
                    TipoServicioService,
                    ExpedienteService
                ]
            })
            .overrideTemplate(ExpedienteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpedienteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpedienteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Expediente(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.expediente = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'expedienteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Expediente();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.expediente = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'expedienteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
