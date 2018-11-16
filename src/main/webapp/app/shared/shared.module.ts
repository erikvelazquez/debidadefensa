import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgxUploaderModule } from 'ngx-uploader';

import {
    DebidadefensaSharedLibsModule,
    DebidadefensaSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    HasAnyAuthorityDirective,
} from './';

@NgModule({
    imports: [
        DebidadefensaSharedLibsModule,
        DebidadefensaSharedCommonModule,
        NgxUploaderModule,
    ],
    declarations: [
        JhiLoginModalComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        UserService,
        DatePipe
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [
        DebidadefensaSharedCommonModule,
        JhiLoginModalComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        NgxUploaderModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class DebidadefensaSharedModule {}
