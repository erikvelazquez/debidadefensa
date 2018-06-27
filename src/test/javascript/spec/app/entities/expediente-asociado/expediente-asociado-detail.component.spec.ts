/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { ExpedienteAsociadoDetailComponent } from '../../../../../../main/webapp/app/entities/expediente-asociado/expediente-asociado-detail.component';
import { ExpedienteAsociadoService } from '../../../../../../main/webapp/app/entities/expediente-asociado/expediente-asociado.service';
import { ExpedienteAsociado } from '../../../../../../main/webapp/app/entities/expediente-asociado/expediente-asociado.model';

describe('Component Tests', () => {

    describe('ExpedienteAsociado Management Detail Component', () => {
        let comp: ExpedienteAsociadoDetailComponent;
        let fixture: ComponentFixture<ExpedienteAsociadoDetailComponent>;
        let service: ExpedienteAsociadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ExpedienteAsociadoDetailComponent],
                providers: [
                    ExpedienteAsociadoService
                ]
            })
            .overrideTemplate(ExpedienteAsociadoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpedienteAsociadoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpedienteAsociadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ExpedienteAsociado(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.expedienteAsociado).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
