import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/**
 * This is the main entry point for the Angular application.
 * It replaces the AngularJS bootstrap process with Angular's platformBrowserDynamic.
 * 
 * Key migration changes:
 * - Removed all AngularJS module imports and declarations
 * - Replaced angular.bootstrap with platformBrowserDynamic().bootstrapModule
 * - Added environment configuration for production mode
 * - All module imports are now handled in AppModule
 * - Constants, config, and run blocks are migrated to Angular providers and APP_INITIALIZER
 */

// Enable production mode if we're in production environment
if (environment.production) {
  enableProdMode();
}

// Bootstrap the Angular application with the root AppModule
// This replaces the AngularJS angular.bootstrap call
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error('Application initialization failed:', err));

/**
 * Note: The following AngularJS features have been migrated as follows:
 * 
 * - 'ui.router' -> Angular Router (@angular/router)
 * - 'templates' -> Component-level templates and templateUrl properties
 * - Module constants -> Angular environment variables and injectable tokens
 * - Module config -> Angular module providers and factory functions
 * - Module run blocks -> APP_INITIALIZER providers
 * - strictDi -> TypeScript's strict mode and explicit DI with @Injectable()
 * 
 * All feature modules (layout, components, home, profile, etc.) are now imported
 * in the AppModule or lazy-loaded through the Angular Router.
 */