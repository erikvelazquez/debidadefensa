/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { ParteComponent } from '../../../../../../main/webapp/app/entities/parte/parte.component';
import { ParteService } from '../../../../../../main/webapp/app/entities/parte/parte.service';
import { Parte } from '../../../../../../main/webapp/app/entities/parte/parte.model';

describe('Component Tests', () => {

    describe('Parte Management Component', () => {
        let comp: ParteComponent;
        let fixture: ComponentFixture<ParteComponent>;
        let service: ParteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ParteComponent],
                providers: [
                    ParteService
                ]
            })
            .overrideTemplate(ParteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Parte(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.partes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
