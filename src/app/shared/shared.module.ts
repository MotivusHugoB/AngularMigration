import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import components
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { FollowBtnComponent } from './buttons/follow-btn/follow-btn.component';
import { ArticleMetaComponent } from './article-helpers/article-meta/article-meta.component';
import { FavoriteBtnComponent } from './buttons/favorite-btn/favorite-btn.component';
import { ArticlePreviewComponent } from './article-helpers/article-preview/article-preview.component';
import { ArticleListComponent } from './article-helpers/article-list/article-list.component';
import { ListPaginationComponent } from './article-helpers/list-pagination/list-pagination.component';

// Import directives
import { ShowAuthedDirective } from './directives/show-authed.directive';

/**
 * SharedModule contains common components, directives, and pipes that are used across multiple feature modules.
 * 
 * This module follows the Angular best practice of creating a shared module for reusable components:
 * - All components are declared and exported so they can be used in other modules
 * - CommonModule is imported to provide access to common directives like *ngIf and *ngFor
 * - RouterModule is imported to support routerLink in components
 * - No services are provided here as they should be provided in CoreModule or feature modules
 * 
 * Components included:
 * - List errors: Displays form validation errors
 * - Follow button: Button to follow/unfollow users
 * - Article meta: Displays article metadata
 * - Favorite button: Button to favorite/unfavorite articles
 * - Article preview: Preview card for articles
 * - Article list: Container for article previews
 * - List pagination: Pagination controls for lists
 * 
 * Directives included:
 * - ShowAuthed: Conditional display based on authentication status
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule
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
    // Re-export CommonModule for convenience in feature modules
    CommonModule,
    
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
  ]
})
export class SharedModule {}