/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { TipoServicioDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-servicio/tipo-servicio-detail.component';
import { TipoServicioService } from '../../../../../../main/webapp/app/entities/tipo-servicio/tipo-servicio.service';
import { TipoServicio } from '../../../../../../main/webapp/app/entities/tipo-servicio/tipo-servicio.model';

describe('Component Tests', () => {

    describe('TipoServicio Management Detail Component', () => {
        let comp: TipoServicioDetailComponent;
        let fixture: ComponentFixture<TipoServicioDetailComponent>;
        let service: TipoServicioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TipoServicioDetailComponent],
                providers: [
                    TipoServicioService
                ]
            })
            .overrideTemplate(TipoServicioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoServicioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoServicioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TipoServicio(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.tipoServicio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
