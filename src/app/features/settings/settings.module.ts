import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { SettingsComponent } from './settings.component';

// Routes
import { SettingsRoutingModule } from './settings-routing.module';

// Shared modules
import { SharedModule } from '../../shared/shared.module';

/**
 * Settings Feature Module
 * 
 * This module encapsulates all functionality related to user settings.
 * It follows the Angular feature module pattern and is configured for lazy loading
 * through the main app routing configuration.
 * 
 * The module includes:
 * - Settings component for user profile settings management
 * - Form handling for user settings updates
 * - Integration with the user service for persistence
 */
@NgModule({
  imports: [
    // Angular core modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
    // Feature routing
    SettingsRoutingModule,
    
    // Shared components, directives, and pipes
    SharedModule
  ],
  declarations: [
    SettingsComponent
  ],
  // No providers here as services should be provided in the core module
  // or with providedIn: 'root' for application-wide singleton services
})
export class SettingsModule { }