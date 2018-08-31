import './vendor.ts';
import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { DebidadefensaSharedModule, UserRouteAccessService } from './shared';
import { DebidadefensaAppRoutingModule} from './app-routing.module';
import { DebidadefensaHomeModule } from './home/home.module';
import { DebidadefensaAdminModule } from './admin/admin.module';
import { DebidadefensaAccountModule } from './account/account.module';
import { DebidadefensaEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import {MatSidenavModule,
        MatCardModule,
        MatMenuModule,
        MatDividerModule,
        MatIconModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, CalendarCommonModule, CalendarDayModule, CalendarMonthModule, CalendarWeekModule} from 'angular-calendar';

import {  FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { NgxDateTimePickerModule } from 'ngx-date-time-picker';
// import { FlatpickrModule } from 'flatpickr';
@NgModule({
    imports: [
        MatSidenavModule,
        MatCardModule,
        MatMenuModule,
        MatDividerModule,
        MatIconModule,
        BrowserAnimationsModule ,
        BrowserModule,
        DebidadefensaAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        DebidadefensaSharedModule,
        DebidadefensaHomeModule,
        DebidadefensaAdminModule,
        DebidadefensaAccountModule,
        DebidadefensaEntityModule,
        CalendarModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModalModule.forRoot(),
        CalendarCommonModule,
        CalendarModule,
        CalendarDayModule,
        CalendarMonthModule,
        CalendarWeekModule,
        NgxDateTimePickerModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class DebidadefensaAppModule {}
