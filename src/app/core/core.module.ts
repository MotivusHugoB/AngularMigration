import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserService } from './services/user.service';

/**
 * Core Module
 * 
 * This module contains singleton services and application-wide providers that should be
 * instantiated only once in the application lifecycle.
 * 
 * Features:
 * - HTTP interceptors configuration
 * - Core services that should have exactly one instance
 * - Application-wide configuration
 * 
 * Note: This module should only be imported in the AppModule
 */
@NgModule({
  imports: [
    // Angular modules
    BrowserModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    // HTTP interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // Core services
    UserService
  ]
})
export class CoreModule {
  /**
   * Guard against importing CoreModule more than once
   * @throws Error if CoreModule is imported more than once
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}