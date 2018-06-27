/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteGeneralDialogComponent } from '../../../../../../main/webapp/app/entities/tramite-general/tramite-general-dialog.component';
import { TramiteGeneralService } from '../../../../../../main/webapp/app/entities/tramite-general/tramite-general.service';
import { TramiteGeneral } from '../../../../../../main/webapp/app/entities/tramite-general/tramite-general.model';
import { ClienteService } from '../../../../../../main/webapp/app/entities/cliente';
import { EstatusService } from '../../../../../../main/webapp/app/entities/estatus';
import { TramiteAsociadoService } from '../../../../../../main/webapp/app/entities/tramite-asociado';

describe('Component Tests', () => {

    describe('TramiteGeneral Management Dialog Component', () => {
        let comp: TramiteGeneralDialogComponent;
        let fixture: ComponentFixture<TramiteGeneralDialogComponent>;
        let service: TramiteGeneralService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteGeneralDialogComponent],
                providers: [
                    ClienteService,
                    EstatusService,
                    TramiteAsociadoService,
                    TramiteGeneralService
                ]
            })
            .overrideTemplate(TramiteGeneralDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteGeneralDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteGeneralService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TramiteGeneral(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tramiteGeneral = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tramiteGeneralListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TramiteGeneral();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tramiteGeneral = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tramiteGeneralListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
