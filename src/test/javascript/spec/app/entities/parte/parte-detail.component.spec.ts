/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DebidadefensaTestModule } from '../../../test.module';
import { ParteDetailComponent } from '../../../../../../main/webapp/app/entities/parte/parte-detail.component';
import { ParteService } from '../../../../../../main/webapp/app/entities/parte/parte.service';
import { Parte } from '../../../../../../main/webapp/app/entities/parte/parte.model';

describe('Component Tests', () => {

    describe('Parte Management Detail Component', () => {
        let comp: ParteDetailComponent;
        let fixture: ComponentFixture<ParteDetailComponent>;
        let service: ParteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ParteDetailComponent],
                providers: [
                    ParteService
                ]
            })
            .overrideTemplate(ParteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Parte(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.parte).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
