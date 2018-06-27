/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { CostoServicioDialogComponent } from '../../../../../../main/webapp/app/entities/costo-servicio/costo-servicio-dialog.component';
import { CostoServicioService } from '../../../../../../main/webapp/app/entities/costo-servicio/costo-servicio.service';
import { CostoServicio } from '../../../../../../main/webapp/app/entities/costo-servicio/costo-servicio.model';
import { ExpedienteService } from '../../../../../../main/webapp/app/entities/expediente';
import { TramiteMigratorioService } from '../../../../../../main/webapp/app/entities/tramite-migratorio';
import { TramiteGeneralService } from '../../../../../../main/webapp/app/entities/tramite-general';
import { TipoServicioService } from '../../../../../../main/webapp/app/entities/tipo-servicio';

describe('Component Tests', () => {

    describe('CostoServicio Management Dialog Component', () => {
        let comp: CostoServicioDialogComponent;
        let fixture: ComponentFixture<CostoServicioDialogComponent>;
        let service: CostoServicioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [CostoServicioDialogComponent],
                providers: [
                    ExpedienteService,
                    TramiteMigratorioService,
                    TramiteGeneralService,
                    TipoServicioService,
                    CostoServicioService
                ]
            })
            .overrideTemplate(CostoServicioDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoServicioDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoServicioService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CostoServicio(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.costoServicio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'costoServicioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new CostoServicio();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.costoServicio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'costoServicioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
