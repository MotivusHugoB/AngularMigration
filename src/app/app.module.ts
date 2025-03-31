import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Feature modules
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

// Constants and services
import { AppConstants } from './core/config/app.constants';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';

/**
 * Main application module that bootstraps the Angular application.
 * 
 * This module:
 * 1. Imports core Angular modules (BrowserModule, HttpClientModule)
 * 2. Imports feature modules that are needed eagerly (not lazy loaded)
 * 3. Configures application-wide services and interceptors
 * 4. Bootstraps the main AppComponent
 * 
 * Note: Editor module is not imported here as it will be lazy loaded
 * via the routing configuration in AppRoutingModule.
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular core modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    // Core and shared modules
    CoreModule,
    SharedModule,
    
    // Feature modules (non-lazy loaded)
    HomeModule,
    ProfileModule,
    ArticleModule,
    AuthModule,
    SettingsModule,
    
    // Routing module (must be last to ensure proper route precedence)
    AppRoutingModule
  ],
  providers: [
    { provide: 'AppConstants', useValue: AppConstants },
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }