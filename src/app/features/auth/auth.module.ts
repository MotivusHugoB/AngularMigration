import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';

/**
 * Authentication Feature Module
 * 
 * This module handles user authentication functionality including:
 * - Login
 * - Registration
 * - Authentication state management
 * 
 * The module is configured for lazy loading through the AuthRoutingModule
 * which contains the routes for authentication pages.
 */
@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }