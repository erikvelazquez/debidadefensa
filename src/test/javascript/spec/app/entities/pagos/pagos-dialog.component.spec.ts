/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { PagosDialogComponent } from '../../../../../../main/webapp/app/entities/pagos/pagos-dialog.component';
import { PagosService } from '../../../../../../main/webapp/app/entities/pagos/pagos.service';
import { Pagos } from '../../../../../../main/webapp/app/entities/pagos/pagos.model';
import { ExpedienteService } from '../../../../../../main/webapp/app/entities/expediente';
import { TramiteMigratorioService } from '../../../../../../main/webapp/app/entities/tramite-migratorio';
import { TramiteGeneralService } from '../../../../../../main/webapp/app/entities/tramite-general';
import { TipoServicioService } from '../../../../../../main/webapp/app/entities/tipo-servicio';

describe('Component Tests', () => {

    describe('Pagos Management Dialog Component', () => {
        let comp: PagosDialogComponent;
        let fixture: ComponentFixture<PagosDialogComponent>;
        let service: PagosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [PagosDialogComponent],
                providers: [
                    ExpedienteService,
                    TramiteMigratorioService,
                    TramiteGeneralService,
                    TipoServicioService,
                    PagosService
                ]
            })
            .overrideTemplate(PagosDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PagosDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagosService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Pagos(123);
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
                        const entity = new Pagos();
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
