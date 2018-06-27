/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { FechasServicioComponent } from '../../../../../../main/webapp/app/entities/fechas-servicio/fechas-servicio.component';
import { FechasServicioService } from '../../../../../../main/webapp/app/entities/fechas-servicio/fechas-servicio.service';
import { FechasServicio } from '../../../../../../main/webapp/app/entities/fechas-servicio/fechas-servicio.model';

describe('Component Tests', () => {

    describe('FechasServicio Management Component', () => {
        let comp: FechasServicioComponent;
        let fixture: ComponentFixture<FechasServicioComponent>;
        let service: FechasServicioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [FechasServicioComponent],
                providers: [
                    FechasServicioService
                ]
            })
            .overrideTemplate(FechasServicioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FechasServicioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FechasServicioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FechasServicio(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.fechasServicios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
