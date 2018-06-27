/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { FechasServicioDialogComponent } from '../../../../../../main/webapp/app/entities/fechas-servicio/fechas-servicio-dialog.component';
import { FechasServicioService } from '../../../../../../main/webapp/app/entities/fechas-servicio/fechas-servicio.service';
import { FechasServicio } from '../../../../../../main/webapp/app/entities/fechas-servicio/fechas-servicio.model';
import { ExpedienteService } from '../../../../../../main/webapp/app/entities/expediente';
import { TramiteMigratorioService } from '../../../../../../main/webapp/app/entities/tramite-migratorio';
import { TramiteGeneralService } from '../../../../../../main/webapp/app/entities/tramite-general';
import { TipoServicioService } from '../../../../../../main/webapp/app/entities/tipo-servicio';

describe('Component Tests', () => {

    describe('FechasServicio Management Dialog Component', () => {
        let comp: FechasServicioDialogComponent;
        let fixture: ComponentFixture<FechasServicioDialogComponent>;
        let service: FechasServicioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [FechasServicioDialogComponent],
                providers: [
                    ExpedienteService,
                    TramiteMigratorioService,
                    TramiteGeneralService,
                    TipoServicioService,
                    FechasServicioService
                ]
            })
            .overrideTemplate(FechasServicioDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FechasServicioDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FechasServicioService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FechasServicio(123);
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
                        const entity = new FechasServicio();
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
