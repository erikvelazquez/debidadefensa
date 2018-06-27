/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { CostoServicioDetailComponent } from '../../../../../../main/webapp/app/entities/costo-servicio/costo-servicio-detail.component';
import { CostoServicioService } from '../../../../../../main/webapp/app/entities/costo-servicio/costo-servicio.service';
import { CostoServicio } from '../../../../../../main/webapp/app/entities/costo-servicio/costo-servicio.model';

describe('Component Tests', () => {

    describe('CostoServicio Management Detail Component', () => {
        let comp: CostoServicioDetailComponent;
        let fixture: ComponentFixture<CostoServicioDetailComponent>;
        let service: CostoServicioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [CostoServicioDetailComponent],
                providers: [
                    CostoServicioService
                ]
            })
            .overrideTemplate(CostoServicioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoServicioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoServicioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CostoServicio(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.costoServicio).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
