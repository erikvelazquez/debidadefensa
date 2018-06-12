/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DebidadefensaTestModule } from '../../../test.module';
import { TramiteMigratorioMySuffixComponent } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix/tramite-migratorio-my-suffix.component';
import { TramiteMigratorioMySuffixService } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix/tramite-migratorio-my-suffix.service';
import { TramiteMigratorioMySuffix } from '../../../../../../main/webapp/app/entities/tramite-migratorio-my-suffix/tramite-migratorio-my-suffix.model';

describe('Component Tests', () => {

    describe('TramiteMigratorioMySuffix Management Component', () => {
        let comp: TramiteMigratorioMySuffixComponent;
        let fixture: ComponentFixture<TramiteMigratorioMySuffixComponent>;
        let service: TramiteMigratorioMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DebidadefensaTestModule],
                declarations: [TramiteMigratorioMySuffixComponent],
                providers: [
                    TramiteMigratorioMySuffixService
                ]
            })
            .overrideTemplate(TramiteMigratorioMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TramiteMigratorioMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TramiteMigratorioMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TramiteMigratorioMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.tramiteMigratorios[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
