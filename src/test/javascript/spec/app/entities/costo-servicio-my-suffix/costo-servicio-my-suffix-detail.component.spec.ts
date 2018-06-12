/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { CostoServicioMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/costo-servicio-my-suffix/costo-servicio-my-suffix-detail.component';
import { CostoServicioMySuffixService } from '../../../../../../main/webapp/app/entities/costo-servicio-my-suffix/costo-servicio-my-suffix.service';
import { CostoServicioMySuffix } from '../../../../../../main/webapp/app/entities/costo-servicio-my-suffix/costo-servicio-my-suffix.model';

describe('Component Tests', () => {

    describe('CostoServicioMySuffix Management Detail Component', () => {
        let comp: CostoServicioMySuffixDetailComponent;
        let fixture: ComponentFixture<CostoServicioMySuffixDetailComponent>;
        let service: CostoServicioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [CostoServicioMySuffixDetailComponent],
                providers: [
                    CostoServicioMySuffixService
                ]
            })
            .overrideTemplate(CostoServicioMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoServicioMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoServicioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CostoServicioMySuffix(123)
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
