import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  /**
   * AppComponent serves as the root component of the Angular application.
   * In the migration from AngularJS, this replaces the manual bootstrap process.
   * 
   * Key migration notes:
   * - Angular's built-in dependency injection replaces AngularJS's manual DI
   * - Angular CLI handles module bundling instead of manual imports
   * - The router-outlet replaces ui-router's ui-view directive
   * - Angular modules are configured in separate module files rather than here
   */
  
  constructor() {}

  ngOnInit(): void {
    // Any initialization logic that was in appRun can be placed here
    // or in APP_INITIALIZER providers in the AppModule
  }
}