/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { PagosComponent } from '../../../../../../main/webapp/app/entities/pagos/pagos.component';
import { PagosService } from '../../../../../../main/webapp/app/entities/pagos/pagos.service';
import { Pagos } from '../../../../../../main/webapp/app/entities/pagos/pagos.model';

describe('Component Tests', () => {

    describe('Pagos Management Component', () => {
        let comp: PagosComponent;
        let fixture: ComponentFixture<PagosComponent>;
        let service: PagosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [PagosComponent],
                providers: [
                    PagosService
                ]
            })
            .overrideTemplate(PagosComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PagosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PagosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Pagos(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.pagos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
