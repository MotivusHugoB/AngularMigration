import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Auth Feature Module
 * 
 * This module handles user authentication functionality including:
 * - Login
 * - Registration
 * - Authentication state management
 * 
 * It's configured as a feature module that can be lazy-loaded through the
 * routing configuration in the main AppRoutingModule.
 */
@NgModule({
  imports: [
    // Angular core modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    
    // Feature-specific routing
    AuthRoutingModule,
    
    // Shared components, directives, and pipes
    SharedModule
  ],
  declarations: [
    // Components
    AuthComponent
  ],
  providers: [
    // Auth-specific services would be provided here if they're only used within this module
    // Otherwise, they should be provided in the CoreModule
  ]
})
export class AuthModule { }