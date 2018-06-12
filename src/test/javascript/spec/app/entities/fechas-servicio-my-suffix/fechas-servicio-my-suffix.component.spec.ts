/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { FechasServicioMySuffixComponent } from '../../../../../../main/webapp/app/entities/fechas-servicio-my-suffix/fechas-servicio-my-suffix.component';
import { FechasServicioMySuffixService } from '../../../../../../main/webapp/app/entities/fechas-servicio-my-suffix/fechas-servicio-my-suffix.service';
import { FechasServicioMySuffix } from '../../../../../../main/webapp/app/entities/fechas-servicio-my-suffix/fechas-servicio-my-suffix.model';

describe('Component Tests', () => {

    describe('FechasServicioMySuffix Management Component', () => {
        let comp: FechasServicioMySuffixComponent;
        let fixture: ComponentFixture<FechasServicioMySuffixComponent>;
        let service: FechasServicioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [FechasServicioMySuffixComponent],
                providers: [
                    FechasServicioMySuffixService
                ]
            })
            .overrideTemplate(FechasServicioMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FechasServicioMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FechasServicioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FechasServicioMySuffix(123)],
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
