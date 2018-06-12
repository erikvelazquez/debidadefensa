/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { CostoServicioMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/costo-servicio-my-suffix/costo-servicio-my-suffix-delete-dialog.component';
import { CostoServicioMySuffixService } from '../../../../../../main/webapp/app/entities/costo-servicio-my-suffix/costo-servicio-my-suffix.service';

describe('Component Tests', () => {

    describe('CostoServicioMySuffix Management Delete Component', () => {
        let comp: CostoServicioMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CostoServicioMySuffixDeleteDialogComponent>;
        let service: CostoServicioMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [CostoServicioMySuffixDeleteDialogComponent],
                providers: [
                    CostoServicioMySuffixService
                ]
            })
            .overrideTemplate(CostoServicioMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoServicioMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoServicioMySuffixService);
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
