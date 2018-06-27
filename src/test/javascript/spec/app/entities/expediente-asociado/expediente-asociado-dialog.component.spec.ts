/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { ExpedienteAsociadoDialogComponent } from '../../../../../../main/webapp/app/entities/expediente-asociado/expediente-asociado-dialog.component';
import { ExpedienteAsociadoService } from '../../../../../../main/webapp/app/entities/expediente-asociado/expediente-asociado.service';
import { ExpedienteAsociado } from '../../../../../../main/webapp/app/entities/expediente-asociado/expediente-asociado.model';
import { ExpedienteService } from '../../../../../../main/webapp/app/entities/expediente';
import { EstatusService } from '../../../../../../main/webapp/app/entities/estatus';

describe('Component Tests', () => {

    describe('ExpedienteAsociado Management Dialog Component', () => {
        let comp: ExpedienteAsociadoDialogComponent;
        let fixture: ComponentFixture<ExpedienteAsociadoDialogComponent>;
        let service: ExpedienteAsociadoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ExpedienteAsociadoDialogComponent],
                providers: [
                    ExpedienteService,
                    EstatusService,
                    ExpedienteAsociadoService
                ]
            })
            .overrideTemplate(ExpedienteAsociadoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpedienteAsociadoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpedienteAsociadoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ExpedienteAsociado(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.expedienteAsociado = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'expedienteAsociadoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ExpedienteAsociado();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.expedienteAsociado = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'expedienteAsociadoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
