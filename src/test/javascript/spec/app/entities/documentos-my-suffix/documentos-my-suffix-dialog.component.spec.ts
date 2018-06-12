/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DebidadefensaTestModule } from '../../../test.module';
import { DocumentosMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/documentos-my-suffix/documentos-my-suffix-dialog.component';
import { DocumentosMySuffixService } from '../../../../../../main/webapp/app/entities/documentos-my-suffix/documentos-my-suffix.service';
import { DocumentosMySuffix } from '../../../../../../main/webapp/app/entities/documentos-my-suffix/documentos-my-suffix.model';
import { ExpedienteMySuffixService } from '../../../../../../main/webapp/app/entities/expediente-my-suffix';
import { ExpedienteAsociadoMySuffixService } from '../../../../../../main/webapp/app/entities/expediente-asociado-my-suffix';
import { TramiteMigratorioMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix';
import { TramiteGeneralMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-general-my-suffix';
import { TipoServicioMySuffixService } from '../../../../../../main/webapp/app/entities/tipo-servicio-my-suffix';

describe('Component Tests', () => {

    describe('DocumentosMySuffix Management Dialog Component', () => {
        let comp: DocumentosMySuffixDialogComponent;
        let fixture: ComponentFixture<DocumentosMySuffixDialogComponent>;
        let service: DocumentosMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [DocumentosMySuffixDialogComponent],
                providers: [
                    ExpedienteMySuffixService,
                    ExpedienteAsociadoMySuffixService,
                    TramiteMigratorioMySuffixService,
                    TramiteGeneralMySuffixService,
                    TipoServicioMySuffixService,
                    DocumentosMySuffixService
                ]
            })
            .overrideTemplate(DocumentosMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DocumentosMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentosMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new DocumentosMySuffix(123);
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
                        const entity = new DocumentosMySuffix();
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
