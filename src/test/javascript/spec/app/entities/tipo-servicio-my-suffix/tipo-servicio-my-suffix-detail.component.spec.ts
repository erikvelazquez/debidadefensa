/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { TipoServicioMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/tipo-servicio-my-suffix/tipo-servicio-my-suffix-detail.component';
import { TipoServicioMySuffixService } from '../../../../../../main/webapp/app/entities/tipo-servicio-my-suffix/tipo-servicio-my-suffix.service';
import { TipoServicioMySuffix } from '../../../../../../main/webapp/app/entities/tipo-servicio-my-suffix/tipo-servicio-my-suffix.model';

describe('Component Tests', () => {

    describe('TipoServicioMySuffix Management Detail Component', () => {
        let comp: TipoServicioMySuffixDetailComponent;
        let fixture: ComponentFixture<TipoServicioMySuffixDetailComponent>;
        let service: TipoServicioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TipoServicioMySuffixDetailComponent],
                providers: [
                    TipoServicioMySuffixService
                ]
            })
            .overrideTemplate(TipoServicioMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoServicioMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoServicioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TipoServicioMySuffix(123)
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
