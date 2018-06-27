/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { ExpedienteDetailComponent } from '../../../../../../main/webapp/app/entities/expediente/expediente-detail.component';
import { ExpedienteService } from '../../../../../../main/webapp/app/entities/expediente/expediente.service';
import { Expediente } from '../../../../../../main/webapp/app/entities/expediente/expediente.model';

describe('Component Tests', () => {

    describe('Expediente Management Detail Component', () => {
        let comp: ExpedienteDetailComponent;
        let fixture: ComponentFixture<ExpedienteDetailComponent>;
        let service: ExpedienteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ExpedienteDetailComponent],
                providers: [
                    ExpedienteService
                ]
            })
            .overrideTemplate(ExpedienteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExpedienteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExpedienteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Expediente(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.expediente).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
