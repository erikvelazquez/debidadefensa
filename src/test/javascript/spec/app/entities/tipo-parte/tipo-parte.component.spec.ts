/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { TipoParteComponent } from '../../../../../../main/webapp/app/entities/tipo-parte/tipo-parte.component';
import { TipoParteService } from '../../../../../../main/webapp/app/entities/tipo-parte/tipo-parte.service';
import { TipoParte } from '../../../../../../main/webapp/app/entities/tipo-parte/tipo-parte.model';

describe('Component Tests', () => {

    describe('TipoParte Management Component', () => {
        let comp: TipoParteComponent;
        let fixture: ComponentFixture<TipoParteComponent>;
        let service: TipoParteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TipoParteComponent],
                providers: [
                    TipoParteService
                ]
            })
            .overrideTemplate(TipoParteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TipoParteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TipoParteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TipoParte(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tipoPartes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
