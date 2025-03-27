import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Component - Root component that hosts the application
import { AppComponent } from './app.component';

// App Routing Module - Contains the application's route configuration
import { AppRoutingModule } from './app-routing.module';

// Feature Modules - Each represents a domain area of the application
import { HomeModule } from './features/home/home.module';
import { ProfileModule } from './features/profile/profile.module';
import { ArticleModule } from './features/articles/articles.module';
import { AuthModule } from './features/auth/auth.module';
import { SettingsModule } from './features/settings/settings.module';
import { EditorModule } from './features/editor/editor.module';
import { LayoutModule } from './features/layout/layout.module';

// Core Module - Contains singleton services, interceptors, and other app-wide providers
import { CoreModule } from './core/core.module';

// Shared Module - Contains reusable components, directives, and pipes
import { SharedModule } from './shared/shared.module';

// Environment configuration
import { environment } from '../environments/environment';

// HTTP Interceptors
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';

// App Constants
import { APP_CONFIG } from './core/config/app.config';
import { appConstants } from './core/config/app.constants';

/**
 * Main application module that bootstraps Angular application
 * 
 * This module:
 * 1. Imports Angular core modules (BrowserModule, HttpClientModule)
 * 2. Imports feature modules (Home, Profile, Article, etc.)
 * 3. Configures app-wide providers including HTTP interceptors
 * 4. Bootstraps the root AppComponent
 * 
 * Feature modules are eagerly loaded here, but could be converted to lazy loading
 * by moving their imports to the routing configuration.
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Core Modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    
    // App Routing
    AppRoutingModule,
    
    // Core & Shared Modules
    CoreModule,
    SharedModule,
    
    // Feature Modules - Consider converting these to lazy-loaded modules
    // by moving them to the routing configuration
    HomeModule,
    ProfileModule,
    ArticleModule,
    AuthModule,
    SettingsModule,
    EditorModule,
    LayoutModule
  ],
  providers: [
    // Global HTTP interceptor for authentication
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    
    // Application constants
    { provide: APP_CONFIG, useValue: appConstants }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  /**
   * Constructor can be used for application-wide initialization logic
   * that needs to run when the app starts
   */
  constructor() {
    // Any initialization logic can go here
    if (!environment.production) {
      console.log('Running in development mode');
    }
  }
}