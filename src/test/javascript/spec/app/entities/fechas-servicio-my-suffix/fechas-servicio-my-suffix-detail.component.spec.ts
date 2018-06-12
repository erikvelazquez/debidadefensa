/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { FechasServicioMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/fechas-servicio-my-suffix/fechas-servicio-my-suffix-detail.component';
import { FechasServicioMySuffixService } from '../../../../../../main/webapp/app/entities/fechas-servicio-my-suffix/fechas-servicio-my-suffix.service';
import { FechasServicioMySuffix } from '../../../../../../main/webapp/app/entities/fechas-servicio-my-suffix/fechas-servicio-my-suffix.model';

describe('Component Tests', () => {

    describe('FechasServicioMySuffix Management Detail Component', () => {
        let comp: FechasServicioMySuffixDetailComponent;
        let fixture: ComponentFixture<FechasServicioMySuffixDetailComponent>;
        let service: FechasServicioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [FechasServicioMySuffixDetailComponent],
                providers: [
                    FechasServicioMySuffixService
                ]
            })
            .overrideTemplate(FechasServicioMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FechasServicioMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FechasServicioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FechasServicioMySuffix(123)
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
