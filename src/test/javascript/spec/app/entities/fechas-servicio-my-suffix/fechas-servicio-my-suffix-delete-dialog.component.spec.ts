/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { FechasServicioMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/fechas-servicio-my-suffix/fechas-servicio-my-suffix-delete-dialog.component';
import { FechasServicioMySuffixService } from '../../../../../../main/webapp/app/entities/fechas-servicio-my-suffix/fechas-servicio-my-suffix.service';

describe('Component Tests', () => {

    describe('FechasServicioMySuffix Management Delete Component', () => {
        let comp: FechasServicioMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<FechasServicioMySuffixDeleteDialogComponent>;
        let service: FechasServicioMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [FechasServicioMySuffixDeleteDialogComponent],
                providers: [
                    FechasServicioMySuffixService
                ]
            })
            .overrideTemplate(FechasServicioMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FechasServicioMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FechasServicioMySuffixService);
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
