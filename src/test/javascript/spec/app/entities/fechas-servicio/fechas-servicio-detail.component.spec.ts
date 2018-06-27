/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { FechasServicioDetailComponent } from '../../../../../../main/webapp/app/entities/fechas-servicio/fechas-servicio-detail.component';
import { FechasServicioService } from '../../../../../../main/webapp/app/entities/fechas-servicio/fechas-servicio.service';
import { FechasServicio } from '../../../../../../main/webapp/app/entities/fechas-servicio/fechas-servicio.model';

describe('Component Tests', () => {

    describe('FechasServicio Management Detail Component', () => {
        let comp: FechasServicioDetailComponent;
        let fixture: ComponentFixture<FechasServicioDetailComponent>;
        let service: FechasServicioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [FechasServicioDetailComponent],
                providers: [
                    FechasServicioService
                ]
            })
            .overrideTemplate(FechasServicioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FechasServicioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FechasServicioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FechasServicio(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.fechasServicio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
