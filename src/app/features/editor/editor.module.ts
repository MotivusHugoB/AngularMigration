import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Editor Feature Module
 * 
 * This module encapsulates the article editor functionality, converted from the AngularJS
 * 'app.editor' module. It's designed to be lazy-loaded through the routing configuration.
 * 
 * The module includes:
 * - EditorComponent (converted from EditorCtrl)
 * - Routing configuration for the editor feature
 * - Form handling capabilities through ReactiveFormsModule
 * - Shared components and directives from SharedModule
 */
@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    EditorRoutingModule,
    SharedModule
  ]
})
export class EditorModule { }