/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { ParteMySuffixComponent } from '../../../../../../main/webapp/app/entities/parte-my-suffix/parte-my-suffix.component';
import { ParteMySuffixService } from '../../../../../../main/webapp/app/entities/parte-my-suffix/parte-my-suffix.service';
import { ParteMySuffix } from '../../../../../../main/webapp/app/entities/parte-my-suffix/parte-my-suffix.model';

describe('Component Tests', () => {

    describe('ParteMySuffix Management Component', () => {
        let comp: ParteMySuffixComponent;
        let fixture: ComponentFixture<ParteMySuffixComponent>;
        let service: ParteMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [ParteMySuffixComponent],
                providers: [
                    ParteMySuffixService
                ]
            })
            .overrideTemplate(ParteMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ParteMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ParteMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ParteMySuffix(123)],
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
