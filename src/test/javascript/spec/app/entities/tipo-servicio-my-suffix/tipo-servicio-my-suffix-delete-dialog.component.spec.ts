/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { TipoServicioMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tipo-servicio-my-suffix/tipo-servicio-my-suffix-delete-dialog.component';
import { TipoServicioMySuffixService } from '../../../../../../main/webapp/app/entities/tipo-servicio-my-suffix/tipo-servicio-my-suffix.service';

describe('Component Tests', () => {

    describe('TipoServicioMySuffix Management Delete Component', () => {
        let comp: TipoServicioMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TipoServicioMySuffixDeleteDialogComponent>;
        let service: TipoServicioMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TipoServicioMySuffixDeleteDialogComponent],
                providers: [
                    TipoServicioMySuffixService
                ]
            })
            .overrideTemplate(TipoServicioMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoServicioMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoServicioMySuffixService);
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
