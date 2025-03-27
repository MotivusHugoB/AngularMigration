import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { ArticleComponent } from './article/article.component';
import { ArticleActionsComponent } from './article-actions/article-actions.component';
import { CommentComponent } from './comment/comment.component';

// Routing
import { ArticlesRoutingModule } from './articles-routing.module';

// Shared components/modules that might be needed
import { SharedModule } from '../../shared/shared.module';

/**
 * Articles Feature Module
 * 
 * This module encapsulates all functionality related to articles including:
 * - Article display
 * - Article actions (favorite, follow, etc.)
 * - Comments functionality
 * 
 * The module is designed to be lazy-loaded through the main routing configuration
 * and provides its own routing configuration through ArticlesRoutingModule.
 */
@NgModule({
  imports: [
    // Angular built-in modules
    CommonModule,
    ReactiveFormsModule,
    
    // Feature-specific routing
    ArticlesRoutingModule,
    
    // Application shared module containing common components, directives, and pipes
    SharedModule
  ],
  declarations: [
    // Components specific to the articles feature
    ArticleComponent,        // Converted from ArticleCtrl
    ArticleActionsComponent, // Converted from ArticleActions component
    CommentComponent         // Converted from Comment component
  ],
  // No need to export components as they're used internally within this feature module
  // and accessed via routing
})
export class ArticlesModule { }