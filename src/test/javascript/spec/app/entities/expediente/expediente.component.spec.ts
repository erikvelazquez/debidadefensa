/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { ExpedienteComponent } from '../../../../../../main/webapp/app/entities/expediente/expediente.component';
import { ExpedienteService } from '../../../../../../main/webapp/app/entities/expediente/expediente.service';
import { Expediente } from '../../../../../../main/webapp/app/entities/expediente/expediente.model';

describe('Component Tests', () => {

    describe('Expediente Management Component', () => {
        let comp: ExpedienteComponent;
        let fixture: ComponentFixture<ExpedienteComponent>;
        let service: ExpedienteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ExpedienteComponent],
                providers: [
                    ExpedienteService
                ]
            })
            .overrideTemplate(ExpedienteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpedienteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpedienteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Expediente(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.expedientes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
