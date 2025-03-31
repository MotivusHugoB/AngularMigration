import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ArticleComponent } from './article.component';
import { ArticleActionsComponent } from './article-actions.component';
import { CommentComponent } from './comment.component';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Feature module for article functionality
 * 
 * This module contains components related to viewing individual articles,
 * including the article display, actions (like favorite/follow),
 * and comments functionality.
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ArticleRoutingModule,
    SharedModule
  ],
  declarations: [
    ArticleComponent,
    ArticleActionsComponent,
    CommentComponent
  ]
})
export class ArticleModule { }