/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { ExpedienteAsociadoMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/expediente-asociado-my-suffix/expediente-asociado-my-suffix-dialog.component';
import { ExpedienteAsociadoMySuffixService } from '../../../../../../main/webapp/app/entities/expediente-asociado-my-suffix/expediente-asociado-my-suffix.service';
import { ExpedienteAsociadoMySuffix } from '../../../../../../main/webapp/app/entities/expediente-asociado-my-suffix/expediente-asociado-my-suffix.model';
import { ExpedienteMySuffixService } from '../../../../../../main/webapp/app/entities/expediente-my-suffix';
import { EstatusMySuffixService } from '../../../../../../main/webapp/app/entities/estatus-my-suffix';

describe('Component Tests', () => {

    describe('ExpedienteAsociadoMySuffix Management Dialog Component', () => {
        let comp: ExpedienteAsociadoMySuffixDialogComponent;
        let fixture: ComponentFixture<ExpedienteAsociadoMySuffixDialogComponent>;
        let service: ExpedienteAsociadoMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ExpedienteAsociadoMySuffixDialogComponent],
                providers: [
                    ExpedienteMySuffixService,
                    EstatusMySuffixService,
                    ExpedienteAsociadoMySuffixService
                ]
            })
            .overrideTemplate(ExpedienteAsociadoMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpedienteAsociadoMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpedienteAsociadoMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ExpedienteAsociadoMySuffix(123);
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
                        const entity = new ExpedienteAsociadoMySuffix();
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
