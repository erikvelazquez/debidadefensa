/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { ExpedienteAsociadoComponent } from '../../../../../../main/webapp/app/entities/expediente-asociado/expediente-asociado.component';
import { ExpedienteAsociadoService } from '../../../../../../main/webapp/app/entities/expediente-asociado/expediente-asociado.service';
import { ExpedienteAsociado } from '../../../../../../main/webapp/app/entities/expediente-asociado/expediente-asociado.model';

describe('Component Tests', () => {

    describe('ExpedienteAsociado Management Component', () => {
        let comp: ExpedienteAsociadoComponent;
        let fixture: ComponentFixture<ExpedienteAsociadoComponent>;
        let service: ExpedienteAsociadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ExpedienteAsociadoComponent],
                providers: [
                    ExpedienteAsociadoService
                ]
            })
            .overrideTemplate(ExpedienteAsociadoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpedienteAsociadoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpedienteAsociadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ExpedienteAsociado(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.expedienteAsociados[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
