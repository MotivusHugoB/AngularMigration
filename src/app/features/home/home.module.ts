import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home.component';

// Routes
import { HOME_ROUTES } from './home-routing.module';

// Shared components that might be needed in the home module
import { SharedModule } from '../../shared/shared.module';

/**
 * Home Feature Module
 * 
 * This module represents the home page feature of the application.
 * It's configured for lazy loading through the main app-routing.module.
 * 
 * Structure:
 * - Imports necessary Angular modules (CommonModule for ngIf/ngFor, etc.)
 * - Imports SharedModule for common components used across features
 * - Declares the HomeComponent which replaces the AngularJS HomeCtrl
 * - Sets up routing for this feature module
 * 
 * The HomeComponent is the main entry point for this feature and handles
 * the business logic that was previously in HomeCtrl.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES),
    SharedModule
  ],
  declarations: [
    HomeComponent
  ],
  // No providers are defined at the module level to follow best practices
  // Services should be provided in the root injector unless they need to be scoped
})
export class HomeModule { }