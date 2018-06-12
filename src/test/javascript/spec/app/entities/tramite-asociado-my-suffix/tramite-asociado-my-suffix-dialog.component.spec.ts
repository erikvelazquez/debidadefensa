/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteAsociadoMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/tramite-asociado-my-suffix/tramite-asociado-my-suffix-dialog.component';
import { TramiteAsociadoMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-asociado-my-suffix/tramite-asociado-my-suffix.service';
import { TramiteAsociadoMySuffix } from '../../../../../../main/webapp/app/entities/tramite-asociado-my-suffix/tramite-asociado-my-suffix.model';

describe('Component Tests', () => {

    describe('TramiteAsociadoMySuffix Management Dialog Component', () => {
        let comp: TramiteAsociadoMySuffixDialogComponent;
        let fixture: ComponentFixture<TramiteAsociadoMySuffixDialogComponent>;
        let service: TramiteAsociadoMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteAsociadoMySuffixDialogComponent],
                providers: [
                    TramiteAsociadoMySuffixService
                ]
            })
            .overrideTemplate(TramiteAsociadoMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteAsociadoMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteAsociadoMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TramiteAsociadoMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tramiteAsociado = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tramiteAsociadoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TramiteAsociadoMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tramiteAsociado = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tramiteAsociadoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
