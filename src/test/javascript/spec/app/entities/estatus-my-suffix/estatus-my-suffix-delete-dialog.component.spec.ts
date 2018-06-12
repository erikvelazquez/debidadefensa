/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { EstatusMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/estatus-my-suffix/estatus-my-suffix-delete-dialog.component';
import { EstatusMySuffixService } from '../../../../../../main/webapp/app/entities/estatus-my-suffix/estatus-my-suffix.service';

describe('Component Tests', () => {

    describe('EstatusMySuffix Management Delete Component', () => {
        let comp: EstatusMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<EstatusMySuffixDeleteDialogComponent>;
        let service: EstatusMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [EstatusMySuffixDeleteDialogComponent],
                providers: [
                    EstatusMySuffixService
                ]
            })
            .overrideTemplate(EstatusMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstatusMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstatusMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
