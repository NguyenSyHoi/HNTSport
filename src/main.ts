import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';
import { en_US, NZ_DATE_LOCALE, NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { enUS, vi as vi_fns } from 'date-fns/locale'
import { APP_ROUTES } from './app/app-routing';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ListIcon } from './app/list-icon';
import { AuthInterceptor } from './app/helper/auth-interceptor';
registerLocaleData(en);
registerLocaleData(zh);
const icons: IconDefinition[] = ListIcon;
bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: NZ_I18N, useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          default:
            return vi_VN;
        }
      },
      deps: [LOCALE_ID]
    },
    { provide: NZ_DATE_LOCALE, useValue: vi_fns },
    importProvidersFrom([RouterModule.forRoot(APP_ROUTES), TranslocoRootModule, HttpClientModule, BrowserAnimationsModule,
    NzIconModule.forRoot(icons),
    ]),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],

});
