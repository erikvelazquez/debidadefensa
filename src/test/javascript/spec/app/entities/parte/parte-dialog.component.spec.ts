/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { ParteDialogComponent } from '../../../../../../main/webapp/app/entities/parte/parte-dialog.component';
import { ParteService } from '../../../../../../main/webapp/app/entities/parte/parte.service';
import { Parte } from '../../../../../../main/webapp/app/entities/parte/parte.model';
import { ExpedienteService } from '../../../../../../main/webapp/app/entities/expediente';
import { TipoParteService } from '../../../../../../main/webapp/app/entities/tipo-parte';

describe('Component Tests', () => {

    describe('Parte Management Dialog Component', () => {
        let comp: ParteDialogComponent;
        let fixture: ComponentFixture<ParteDialogComponent>;
        let service: ParteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ParteDialogComponent],
                providers: [
                    ExpedienteService,
                    TipoParteService,
                    ParteService
                ]
            })
            .overrideTemplate(ParteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Parte(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.parte = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'parteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Parte();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.parte = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'parteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
