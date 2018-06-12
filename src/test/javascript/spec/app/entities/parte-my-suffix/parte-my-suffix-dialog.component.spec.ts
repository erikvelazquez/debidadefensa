/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { ParteMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/parte-my-suffix/parte-my-suffix-dialog.component';
import { ParteMySuffixService } from '../../../../../../main/webapp/app/entities/parte-my-suffix/parte-my-suffix.service';
import { ParteMySuffix } from '../../../../../../main/webapp/app/entities/parte-my-suffix/parte-my-suffix.model';
import { ExpedienteMySuffixService } from '../../../../../../main/webapp/app/entities/expediente-my-suffix';
import { TipoParteMySuffixService } from '../../../../../../main/webapp/app/entities/tipo-parte-my-suffix';

describe('Component Tests', () => {

    describe('ParteMySuffix Management Dialog Component', () => {
        let comp: ParteMySuffixDialogComponent;
        let fixture: ComponentFixture<ParteMySuffixDialogComponent>;
        let service: ParteMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ParteMySuffixDialogComponent],
                providers: [
                    ExpedienteMySuffixService,
                    TipoParteMySuffixService,
                    ParteMySuffixService
                ]
            })
            .overrideTemplate(ParteMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParteMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParteMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ParteMySuffix(123);
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
                        const entity = new ParteMySuffix();
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
