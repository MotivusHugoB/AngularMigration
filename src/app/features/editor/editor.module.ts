import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Import the editor component that will replace the EditorCtrl
import { EditorComponent } from './editor.component';

// Import the editor routing module (to be created separately)
import { EditorRoutingModule } from './editor-routing.module';

// Import shared modules if needed
import { SharedModule } from '../../shared/shared.module';

/**
 * Editor Feature Module
 * 
 * This module encapsulates all functionality related to the article editor feature.
 * It replaces the AngularJS 'app.editor' module and its associated controller (EditorCtrl).
 * 
 * The module is designed to be lazy-loaded through the AppRoutingModule with the
 * following route configuration:
 * {
 *   path: 'editor',
 *   loadChildren: () => import('./features/editor/editor.module').then(m => m.EditorModule)
 * }
 */
@NgModule({
  declarations: [
    // Components
    EditorComponent,
    // Add any other editor-specific components, directives, or pipes here
  ],
  imports: [
    // Angular core modules
    CommonModule,
    ReactiveFormsModule,
    
    // Feature routing module
    EditorRoutingModule,
    
    // Shared module with common components/directives
    SharedModule
  ],
  // No need to export components since they're accessed via routing
  exports: [],
  // No providers needed at module level - use providedIn: 'root' for services
  providers: []
})
export class EditorModule { }