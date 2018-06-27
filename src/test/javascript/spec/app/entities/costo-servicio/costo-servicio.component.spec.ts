/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { CostoServicioComponent } from '../../../../../../main/webapp/app/entities/costo-servicio/costo-servicio.component';
import { CostoServicioService } from '../../../../../../main/webapp/app/entities/costo-servicio/costo-servicio.service';
import { CostoServicio } from '../../../../../../main/webapp/app/entities/costo-servicio/costo-servicio.model';

describe('Component Tests', () => {

    describe('CostoServicio Management Component', () => {
        let comp: CostoServicioComponent;
        let fixture: ComponentFixture<CostoServicioComponent>;
        let service: CostoServicioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [CostoServicioComponent],
                providers: [
                    CostoServicioService
                ]
            })
            .overrideTemplate(CostoServicioComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoServicioComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoServicioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CostoServicio(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.costoServicios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
