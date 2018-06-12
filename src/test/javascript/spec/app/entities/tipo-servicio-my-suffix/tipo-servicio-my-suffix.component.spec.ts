/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { TipoServicioMySuffixComponent } from '../../../../../../main/webapp/app/entities/tipo-servicio-my-suffix/tipo-servicio-my-suffix.component';
import { TipoServicioMySuffixService } from '../../../../../../main/webapp/app/entities/tipo-servicio-my-suffix/tipo-servicio-my-suffix.service';
import { TipoServicioMySuffix } from '../../../../../../main/webapp/app/entities/tipo-servicio-my-suffix/tipo-servicio-my-suffix.model';

describe('Component Tests', () => {

    describe('TipoServicioMySuffix Management Component', () => {
        let comp: TipoServicioMySuffixComponent;
        let fixture: ComponentFixture<TipoServicioMySuffixComponent>;
        let service: TipoServicioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TipoServicioMySuffixComponent],
                providers: [
                    TipoServicioMySuffixService
                ]
            })
            .overrideTemplate(TipoServicioMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoServicioMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoServicioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TipoServicioMySuffix(123)],
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
