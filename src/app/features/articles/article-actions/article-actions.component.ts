import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ArticlesService } from '../../../core/services/articles.service';
import { UserService } from '../../../core/services/user.service';
import { Article } from '../../../core/models/article.model';
import { User } from '../../../core/models/user.model';

/**
 * ArticleActionsComponent provides action buttons for article manipulation
 * (edit/delete) when the current user is the author of the article.
 * 
 * Migration notes:
 * - Converted AngularJS component to Angular @Component
 * - Changed bindings to @Input property with proper typing
 * - Replaced $state.go with Angular Router
 * - Converted promise-based API calls to Observable with RxJS operators
 * - Added proper error handling with finalize operator
 * - Implemented OnInit lifecycle hook instead of constructor initialization
 * - Added TypeScript types for all properties and parameters
 */
@Component({
  selector: 'app-article-actions',
  templateUrl: './article-actions.component.html'
})
export class ArticleActionsComponent implements OnInit {
  // Changed from '=' binding to @Input with proper type
  @Input() article!: Article;
  
  // Properties with proper typing
  canModify: boolean = false;
  isDeleting: boolean = false;
  
  constructor(
    private articlesService: ArticlesService,
    private userService: UserService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // Initialize canModify in ngOnInit lifecycle hook
    // Check if current user is the author of the article
    const currentUser: User | null = this.userService.getCurrentUser();
    
    if (currentUser) {
      this.canModify = (currentUser.username === this.article.author.username);
    } else {
      this.canModify = false;
    }
  }
  
  deleteArticle(): void {
    this.isDeleting = true;
    
    // Convert promise-based API call to Observable with proper error handling
    this.articlesService.deleteArticle(this.article.slug)
      .pipe(
        finalize(() => {
          this.isDeleting = false;
        })
      )
      .subscribe(
        // Success handler
        () => {
          this.router.navigateByUrl('/');
        },
        // Error handler
        (error) => {
          console.error('Error deleting article:', error);
          this.router.navigateByUrl('/');
        }
      );
  }
}