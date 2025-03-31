import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the converted components
import { AppHeaderComponent } from './header.component';
import { AppFooterComponent } from './footer.component';

/**
 * Core Layout Module
 * 
 * This module replaces the AngularJS 'app.layout' module and provides the main
 * layout components for the application (header and footer).
 * 
 * Migration notes:
 * - Converted from AngularJS module to Angular NgModule
 * - Components are now declared and exported in the module instead of registered with .component()
 * - Using CommonModule for common Angular directives
 * - Components are exported so they can be used in other modules
 */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppHeaderComponent,
    AppFooterComponent
  ],
  exports: [
    AppHeaderComponent,
    AppFooterComponent
  ]
})
export class LayoutModule { }

// Export components for direct import elsewhere if needed
export { AppHeaderComponent } from './header.component';
export { AppFooterComponent } from './footer.component';