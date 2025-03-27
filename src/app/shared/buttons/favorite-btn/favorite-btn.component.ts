import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

// Import the services and models
// Note: These imports assume the services and models have been migrated
import { UserService } from '../../../core/services/user.service';
import { ArticlesService } from '../../../core/services/articles.service';
import { Article } from '../../../core/models/article.model';

@Component({
  selector: 'app-favorite-btn',
  templateUrl: './favorite-btn.component.html',
  styleUrls: ['./favorite-btn.component.scss']
})
export class FavoriteBtnComponent implements OnInit {
  // Convert AngularJS '=' binding to Angular @Input
  @Input() article: Article;
  
  // Track submission state
  isSubmitting = false;

  /**
   * Constructor with Angular dependency injection
   * Replaces AngularJS 'ngInject' with constructor parameter injection
   */
  constructor(
    private userService: UserService,
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize component if needed
    // Equivalent to $onInit in AngularJS
  }

  /**
   * Handle favorite/unfavorite action
   * Converted from AngularJS promise-based approach to RxJS Observable pattern
   */
  submit(): void {
    this.isSubmitting = true;

    // Check if user is authenticated
    if (!this.userService.getCurrentUser()) {
      this.router.navigateByUrl('/register');
      return;
    }

    // Toggle favorite status
    if (this.article.favorited) {
      // Unfavorite the article
      this.articlesService.unfavorite(this.article.slug)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe(
          () => {
            this.article.favorited = false;
            this.article.favoritesCount--;
          },
          err => {
            // Error handling (not present in original code)
            console.error('Error unfavoriting article', err);
          }
        );
    } else {
      // Favorite the article
      this.articlesService.favorite(this.article.slug)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe(
          () => {
            this.article.favorited = true;
            this.article.favoritesCount++;
          },
          err => {
            // Error handling (not present in original code)
            console.error('Error favoriting article', err);
          }
        );
    }
  }
}