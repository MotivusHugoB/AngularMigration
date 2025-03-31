import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared/shared.module';

/**
 * Home Feature Module
 * 
 * This module represents the home page feature of the application.
 * It contains the main home component and its related dependencies.
 * 
 * The module is configured for lazy loading through the HomeRoutingModule
 * which defines the routes for this feature.
 */
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }