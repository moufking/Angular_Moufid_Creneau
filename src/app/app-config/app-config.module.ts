import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  apiEndpoint: string;
}

export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint: environment.apiEndpoint
};

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }],
  declarations: []
})
export class AppConfigModule { }
