/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteMigratorioDialogComponent } from '../../../../../../main/webapp/app/entities/tramite-migratorio/tramite-migratorio-dialog.component';
import { TramiteMigratorioService } from '../../../../../../main/webapp/app/entities/tramite-migratorio/tramite-migratorio.service';
import { TramiteMigratorio } from '../../../../../../main/webapp/app/entities/tramite-migratorio/tramite-migratorio.model';
import { ClienteService } from '../../../../../../main/webapp/app/entities/cliente';
import { EstatusService } from '../../../../../../main/webapp/app/entities/estatus';
import { TramiteAsociadoService } from '../../../../../../main/webapp/app/entities/tramite-asociado';

describe('Component Tests', () => {

    describe('TramiteMigratorio Management Dialog Component', () => {
        let comp: TramiteMigratorioDialogComponent;
        let fixture: ComponentFixture<TramiteMigratorioDialogComponent>;
        let service: TramiteMigratorioService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteMigratorioDialogComponent],
                providers: [
                    ClienteService,
                    EstatusService,
                    TramiteAsociadoService,
                    TramiteMigratorioService
                ]
            })
            .overrideTemplate(TramiteMigratorioDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteMigratorioDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteMigratorioService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TramiteMigratorio(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tramiteMigratorio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tramiteMigratorioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TramiteMigratorio();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.tramiteMigratorio = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'tramiteMigratorioListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
