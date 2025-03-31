import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * ProfileModule - Feature module for user profiles
 * 
 * This module handles the display of user profiles and their articles.
 * It uses lazy loading through the ProfileRoutingModule for better performance.
 * 
 * Components:
 * - ProfileComponent: Main profile page showing user information
 * - ProfileArticlesComponent: Displays articles written by the profile user
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    ProfileArticlesComponent
  ]
})
export class ProfileModule { }