import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule
} from '@ngneat/transloco';
import { Injectable, isDevMode, NgModule } from '@angular/core';
import { CartComponent } from './pages/user/landing-page/type-furniture/cart/cart.component';
import { PaymentComponent } from './pages/user/landing-page/type-furniture/payment/payment.component';
import {NzCollapseModule} from "ng-zorro-antd/collapse";


@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

@NgModule({
    exports: [TranslocoModule],
    providers: [
        {
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs: ['en', 'vi'],
                defaultLang: 'vi',
                // Remove this option if your application doesn't support changing language in runtime.
                reRenderOnLangChange: true,
                prodMode: !isDevMode(),
            })
        },
        {provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader}
    ],
    imports: [
        NzCollapseModule
    ],
    declarations: [
    ]
})
export class TranslocoRootModule {}
