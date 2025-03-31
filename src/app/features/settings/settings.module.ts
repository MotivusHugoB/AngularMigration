import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

/**
 * Settings Feature Module
 * 
 * This module encapsulates all functionality related to user settings.
 * It provides components for viewing and editing user profile settings.
 * 
 * The module is designed to be lazy loaded through the main routing configuration.
 */
@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }