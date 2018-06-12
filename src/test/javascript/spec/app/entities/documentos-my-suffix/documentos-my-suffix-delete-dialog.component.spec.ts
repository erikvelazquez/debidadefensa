/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { DocumentosMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/documentos-my-suffix/documentos-my-suffix-delete-dialog.component';
import { DocumentosMySuffixService } from '../../../../../../main/webapp/app/entities/documentos-my-suffix/documentos-my-suffix.service';

describe('Component Tests', () => {

    describe('DocumentosMySuffix Management Delete Component', () => {
        let comp: DocumentosMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<DocumentosMySuffixDeleteDialogComponent>;
        let service: DocumentosMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [DocumentosMySuffixDeleteDialogComponent],
                providers: [
                    DocumentosMySuffixService
                ]
            })
            .overrideTemplate(DocumentosMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentosMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentosMySuffixService);
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
