/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { PagosMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/pagos-my-suffix/pagos-my-suffix-dialog.component';
import { PagosMySuffixService } from '../../../../../../main/webapp/app/entities/pagos-my-suffix/pagos-my-suffix.service';
import { PagosMySuffix } from '../../../../../../main/webapp/app/entities/pagos-my-suffix/pagos-my-suffix.model';
import { ExpedienteMySuffixService } from '../../../../../../main/webapp/app/entities/expediente-my-suffix';
import { TramiteMigratorioMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix';
import { TramiteGeneralMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-general-my-suffix';
import { TipoServicioMySuffixService } from '../../../../../../main/webapp/app/entities/tipo-servicio-my-suffix';

describe('Component Tests', () => {

    describe('PagosMySuffix Management Dialog Component', () => {
        let comp: PagosMySuffixDialogComponent;
        let fixture: ComponentFixture<PagosMySuffixDialogComponent>;
        let service: PagosMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [PagosMySuffixDialogComponent],
                providers: [
                    ExpedienteMySuffixService,
                    TramiteMigratorioMySuffixService,
                    TramiteGeneralMySuffixService,
                    TipoServicioMySuffixService,
                    PagosMySuffixService
                ]
            })
            .overrideTemplate(PagosMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PagosMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagosMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PagosMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.pagos = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'pagosListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PagosMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.pagos = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'pagosListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
