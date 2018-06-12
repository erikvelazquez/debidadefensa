/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { FechasServicioMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/fechas-servicio-my-suffix/fechas-servicio-my-suffix-dialog.component';
import { FechasServicioMySuffixService } from '../../../../../../main/webapp/app/entities/fechas-servicio-my-suffix/fechas-servicio-my-suffix.service';
import { FechasServicioMySuffix } from '../../../../../../main/webapp/app/entities/fechas-servicio-my-suffix/fechas-servicio-my-suffix.model';
import { ExpedienteMySuffixService } from '../../../../../../main/webapp/app/entities/expediente-my-suffix';
import { TramiteMigratorioMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix';
import { TramiteGeneralMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-general-my-suffix';
import { TipoServicioMySuffixService } from '../../../../../../main/webapp/app/entities/tipo-servicio-my-suffix';

describe('Component Tests', () => {

    describe('FechasServicioMySuffix Management Dialog Component', () => {
        let comp: FechasServicioMySuffixDialogComponent;
        let fixture: ComponentFixture<FechasServicioMySuffixDialogComponent>;
        let service: FechasServicioMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [FechasServicioMySuffixDialogComponent],
                providers: [
                    ExpedienteMySuffixService,
                    TramiteMigratorioMySuffixService,
                    TramiteGeneralMySuffixService,
                    TipoServicioMySuffixService,
                    FechasServicioMySuffixService
                ]
            })
            .overrideTemplate(FechasServicioMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FechasServicioMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FechasServicioMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FechasServicioMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.fechasServicio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fechasServicioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FechasServicioMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.fechasServicio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'fechasServicioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
