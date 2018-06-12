/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { PagosMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/pagos-my-suffix/pagos-my-suffix-delete-dialog.component';
import { PagosMySuffixService } from '../../../../../../main/webapp/app/entities/pagos-my-suffix/pagos-my-suffix.service';

describe('Component Tests', () => {

    describe('PagosMySuffix Management Delete Component', () => {
        let comp: PagosMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<PagosMySuffixDeleteDialogComponent>;
        let service: PagosMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [PagosMySuffixDeleteDialogComponent],
                providers: [
                    PagosMySuffixService
                ]
            })
            .overrideTemplate(PagosMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PagosMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagosMySuffixService);
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
