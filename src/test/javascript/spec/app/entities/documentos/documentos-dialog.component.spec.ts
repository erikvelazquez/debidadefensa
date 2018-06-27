/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { DocumentosDialogComponent } from '../../../../../../main/webapp/app/entities/documentos/documentos-dialog.component';
import { DocumentosService } from '../../../../../../main/webapp/app/entities/documentos/documentos.service';
import { Documentos } from '../../../../../../main/webapp/app/entities/documentos/documentos.model';
import { ExpedienteService } from '../../../../../../main/webapp/app/entities/expediente';
import { ExpedienteAsociadoService } from '../../../../../../main/webapp/app/entities/expediente-asociado';
import { TramiteMigratorioService } from '../../../../../../main/webapp/app/entities/tramite-migratorio';
import { TramiteGeneralService } from '../../../../../../main/webapp/app/entities/tramite-general';
import { TipoServicioService } from '../../../../../../main/webapp/app/entities/tipo-servicio';

describe('Component Tests', () => {

    describe('Documentos Management Dialog Component', () => {
        let comp: DocumentosDialogComponent;
        let fixture: ComponentFixture<DocumentosDialogComponent>;
        let service: DocumentosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [DocumentosDialogComponent],
                providers: [
                    ExpedienteService,
                    ExpedienteAsociadoService,
                    TramiteMigratorioService,
                    TramiteGeneralService,
                    TipoServicioService,
                    DocumentosService
                ]
            })
            .overrideTemplate(DocumentosDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentosDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentosService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Documentos(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.documentos = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'documentosListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Documentos();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.documentos = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'documentosListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
