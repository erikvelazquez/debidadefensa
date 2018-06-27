/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { TipoServicioComponent } from '../../../../../../main/webapp/app/entities/tipo-servicio/tipo-servicio.component';
import { TipoServicioService } from '../../../../../../main/webapp/app/entities/tipo-servicio/tipo-servicio.service';
import { TipoServicio } from '../../../../../../main/webapp/app/entities/tipo-servicio/tipo-servicio.model';

describe('Component Tests', () => {

    describe('TipoServicio Management Component', () => {
        let comp: TipoServicioComponent;
        let fixture: ComponentFixture<TipoServicioComponent>;
        let service: TipoServicioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TipoServicioComponent],
                providers: [
                    TipoServicioService
                ]
            })
            .overrideTemplate(TipoServicioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoServicioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoServicioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TipoServicio(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tipoServicios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
