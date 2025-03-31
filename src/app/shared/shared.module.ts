import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { FollowBtnComponent } from './buttons/follow-btn/follow-btn.component';
import { ArticleMetaComponent } from './article-helpers/article-meta/article-meta.component';
import { FavoriteBtnComponent } from './buttons/favorite-btn/favorite-btn.component';
import { ArticlePreviewComponent } from './article-helpers/article-preview/article-preview.component';
import { ArticleListComponent } from './article-helpers/article-list/article-list.component';
import { ListPaginationComponent } from './article-helpers/list-pagination/list-pagination.component';

// Directives
import { ShowAuthedDirective } from './show-authed/show-authed.directive';

/**
 * SharedModule contains common components, directives, and pipes used across the application.
 * This module is imported by feature modules that need these shared elements.
 */
@NgModule({
  imports: [
    CommonModule // Imported for common directives like ngIf, ngFor
  ],
  declarations: [
    // Components
    ListErrorsComponent,
    FollowBtnComponent,
    ArticleMetaComponent,
    FavoriteBtnComponent,
    ArticlePreviewComponent,
    ArticleListComponent,
    ListPaginationComponent,
    
    // Directives
    ShowAuthedDirective
  ],
  exports: [
    // Components
    ListErrorsComponent,
    FollowBtnComponent,
    ArticleMetaComponent,
    FavoriteBtnComponent,
    ArticlePreviewComponent,
    ArticleListComponent,
    ListPaginationComponent,
    
    // Directives
    ShowAuthedDirective,
    
    // Re-export CommonModule so importers of SharedModule get access to these directives
    CommonModule
  ]
})
export class SharedModule {}