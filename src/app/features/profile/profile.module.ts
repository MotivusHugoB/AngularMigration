import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { ProfileComponent } from './profile.component';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';

// Shared modules
import { SharedModule } from '../../shared/shared.module';

// Routes
import { ProfileRoutingModule } from './profile-routing.module';

/**
 * Profile Feature Module
 * 
 * This module encapsulates all functionality related to user profiles:
 * - Profile page component
 * - Profile articles component (showing articles by a specific user)
 * 
 * The module is configured for lazy loading through the app-routing.module.ts
 * with a dedicated ProfileRoutingModule that handles internal routes.
 */
@NgModule({
  imports: [
    // Angular built-in modules
    CommonModule,
    RouterModule,
    
    // Feature-specific routing
    ProfileRoutingModule,
    
    // Shared components, directives, and pipes
    SharedModule
  ],
  declarations: [
    // Components
    ProfileComponent,
    ProfileArticlesComponent
  ],
  // No exports needed as components are only used within this feature module
  // and accessed via routing
})
export class ProfileModule { }