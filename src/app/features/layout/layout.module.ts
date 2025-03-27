import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

/**
 * Layout Module
 * 
 * This module encapsulates the layout components of the application,
 * including the header and footer. These components typically form
 * the shell of the application that wraps around the main content.
 * 
 * The components are exported so they can be used in other modules,
 * particularly the AppModule where they will be included in the main
 * application template.
 */
@NgModule({
  imports: [
    CommonModule, // Provides common directives like ngIf, ngFor
    RouterModule, // Required for routerLink in header navigation
  ],
  declarations: [
    HeaderComponent, // Formerly appHeader component
    FooterComponent, // Formerly appFooter component
  ],
  exports: [
    // Export components to be used in parent modules
    HeaderComponent,
    FooterComponent,
  ]
})
export class LayoutModule { }