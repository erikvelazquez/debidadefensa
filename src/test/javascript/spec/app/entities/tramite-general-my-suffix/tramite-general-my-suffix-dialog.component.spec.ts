/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteGeneralMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/tramite-general-my-suffix/tramite-general-my-suffix-dialog.component';
import { TramiteGeneralMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-general-my-suffix/tramite-general-my-suffix.service';
import { TramiteGeneralMySuffix } from '../../../../../../main/webapp/app/entities/tramite-general-my-suffix/tramite-general-my-suffix.model';
import { ClienteMySuffixService } from '../../../../../../main/webapp/app/entities/cliente-my-suffix';
import { EstatusMySuffixService } from '../../../../../../main/webapp/app/entities/estatus-my-suffix';
import { TramiteAsociadoMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-asociado-my-suffix';

describe('Component Tests', () => {

    describe('TramiteGeneralMySuffix Management Dialog Component', () => {
        let comp: TramiteGeneralMySuffixDialogComponent;
        let fixture: ComponentFixture<TramiteGeneralMySuffixDialogComponent>;
        let service: TramiteGeneralMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteGeneralMySuffixDialogComponent],
                providers: [
                    ClienteMySuffixService,
                    EstatusMySuffixService,
                    TramiteAsociadoMySuffixService,
                    TramiteGeneralMySuffixService
                ]
            })
            .overrideTemplate(TramiteGeneralMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteGeneralMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteGeneralMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TramiteGeneralMySuffix(123);
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
                        const entity = new TramiteGeneralMySuffix();
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
