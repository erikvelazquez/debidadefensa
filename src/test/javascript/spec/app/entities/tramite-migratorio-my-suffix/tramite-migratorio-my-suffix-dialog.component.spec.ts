/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteMigratorioMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix/tramite-migratorio-my-suffix-dialog.component';
import { TramiteMigratorioMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix/tramite-migratorio-my-suffix.service';
import { TramiteMigratorioMySuffix } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix/tramite-migratorio-my-suffix.model';
import { ClienteMySuffixService } from '../../../../../../main/webapp/app/entities/cliente-my-suffix';
import { EstatusMySuffixService } from '../../../../../../main/webapp/app/entities/estatus-my-suffix';
import { TramiteAsociadoMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-asociado-my-suffix';

describe('Component Tests', () => {

    describe('TramiteMigratorioMySuffix Management Dialog Component', () => {
        let comp: TramiteMigratorioMySuffixDialogComponent;
        let fixture: ComponentFixture<TramiteMigratorioMySuffixDialogComponent>;
        let service: TramiteMigratorioMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteMigratorioMySuffixDialogComponent],
                providers: [
                    ClienteMySuffixService,
                    EstatusMySuffixService,
                    TramiteAsociadoMySuffixService,
                    TramiteMigratorioMySuffixService
                ]
            })
            .overrideTemplate(TramiteMigratorioMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteMigratorioMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteMigratorioMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new TramiteMigratorioMySuffix(123);
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
                        const entity = new TramiteMigratorioMySuffix();
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
