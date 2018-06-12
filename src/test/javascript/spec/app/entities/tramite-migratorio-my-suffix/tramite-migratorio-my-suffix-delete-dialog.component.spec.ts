/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteMigratorioMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix/tramite-migratorio-my-suffix-delete-dialog.component';
import { TramiteMigratorioMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix/tramite-migratorio-my-suffix.service';

describe('Component Tests', () => {

    describe('TramiteMigratorioMySuffix Management Delete Component', () => {
        let comp: TramiteMigratorioMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TramiteMigratorioMySuffixDeleteDialogComponent>;
        let service: TramiteMigratorioMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteMigratorioMySuffixDeleteDialogComponent],
                providers: [
                    TramiteMigratorioMySuffixService
                ]
            })
            .overrideTemplate(TramiteMigratorioMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteMigratorioMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteMigratorioMySuffixService);
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
