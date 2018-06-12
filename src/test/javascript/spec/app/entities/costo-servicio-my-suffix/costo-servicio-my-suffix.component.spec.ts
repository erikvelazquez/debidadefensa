/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { CostoServicioMySuffixComponent } from '../../../../../../main/webapp/app/entities/costo-servicio-my-suffix/costo-servicio-my-suffix.component';
import { CostoServicioMySuffixService } from '../../../../../../main/webapp/app/entities/costo-servicio-my-suffix/costo-servicio-my-suffix.service';
import { CostoServicioMySuffix } from '../../../../../../main/webapp/app/entities/costo-servicio-my-suffix/costo-servicio-my-suffix.model';

describe('Component Tests', () => {

    describe('CostoServicioMySuffix Management Component', () => {
        let comp: CostoServicioMySuffixComponent;
        let fixture: ComponentFixture<CostoServicioMySuffixComponent>;
        let service: CostoServicioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [CostoServicioMySuffixComponent],
                providers: [
                    CostoServicioMySuffixService
                ]
            })
            .overrideTemplate(CostoServicioMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CostoServicioMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CostoServicioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CostoServicioMySuffix(123)],
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
