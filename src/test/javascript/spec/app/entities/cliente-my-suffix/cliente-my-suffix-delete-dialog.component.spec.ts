/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { ClienteMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/cliente-my-suffix/cliente-my-suffix-delete-dialog.component';
import { ClienteMySuffixService } from '../../../../../../main/webapp/app/entities/cliente-my-suffix/cliente-my-suffix.service';

describe('Component Tests', () => {

    describe('ClienteMySuffix Management Delete Component', () => {
        let comp: ClienteMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<ClienteMySuffixDeleteDialogComponent>;
        let service: ClienteMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ClienteMySuffixDeleteDialogComponent],
                providers: [
                    ClienteMySuffixService
                ]
            })
            .overrideTemplate(ClienteMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClienteMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClienteMySuffixService);
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
