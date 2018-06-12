/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { EstatusMySuffixComponent } from '../../../../../../main/webapp/app/entities/estatus-my-suffix/estatus-my-suffix.component';
import { EstatusMySuffixService } from '../../../../../../main/webapp/app/entities/estatus-my-suffix/estatus-my-suffix.service';
import { EstatusMySuffix } from '../../../../../../main/webapp/app/entities/estatus-my-suffix/estatus-my-suffix.model';

describe('Component Tests', () => {

    describe('EstatusMySuffix Management Component', () => {
        let comp: EstatusMySuffixComponent;
        let fixture: ComponentFixture<EstatusMySuffixComponent>;
        let service: EstatusMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [EstatusMySuffixComponent],
                providers: [
                    EstatusMySuffixService
                ]
            })
            .overrideTemplate(EstatusMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstatusMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstatusMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EstatusMySuffix(123)],
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
