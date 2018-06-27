/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteGeneralDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tramite-general/tramite-general-delete-dialog.component';
import { TramiteGeneralService } from '../../../../../../main/webapp/app/entities/tramite-general/tramite-general.service';

describe('Component Tests', () => {

    describe('TramiteGeneral Management Delete Component', () => {
        let comp: TramiteGeneralDeleteDialogComponent;
        let fixture: ComponentFixture<TramiteGeneralDeleteDialogComponent>;
        let service: TramiteGeneralService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteGeneralDeleteDialogComponent],
                providers: [
                    TramiteGeneralService
                ]
            })
            .overrideTemplate(TramiteGeneralDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteGeneralDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteGeneralService);
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
