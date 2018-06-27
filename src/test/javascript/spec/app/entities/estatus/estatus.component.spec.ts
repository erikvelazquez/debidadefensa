/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { EstatusComponent } from '../../../../../../main/webapp/app/entities/estatus/estatus.component';
import { EstatusService } from '../../../../../../main/webapp/app/entities/estatus/estatus.service';
import { Estatus } from '../../../../../../main/webapp/app/entities/estatus/estatus.model';

describe('Component Tests', () => {

    describe('Estatus Management Component', () => {
        let comp: EstatusComponent;
        let fixture: ComponentFixture<EstatusComponent>;
        let service: EstatusService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [EstatusComponent],
                providers: [
                    EstatusService
                ]
            })
            .overrideTemplate(EstatusComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstatusComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstatusService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Estatus(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.estatuses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
