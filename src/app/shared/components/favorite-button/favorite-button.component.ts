import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

// Import the services and models
// Note: These imports assume you've already migrated these services and models
import { UserService } from '../../../core/services/user.service';
import { ArticlesService } from '../../../core/services/articles.service';
import { Article } from '../../../core/models/article.model';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent implements OnInit {
  // Convert AngularJS two-way binding '=' to Angular @Input()
  @Input() article!: Article;
  
  // Track submission state
  isSubmitting = false;

  constructor(
    private userService: UserService,
    private articlesService: ArticlesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Initialize component if needed
  }

  /**
   * Handle favorite/unfavorite action
   * - Redirects to register if user is not authenticated
   * - Toggles favorite status and updates count
   */
  submit(): void {
    this.isSubmitting = true;

    // Check if user is logged in
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
          error => {
            // Handle error case
            console.error('Error unfavoriting article', error);
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
          error => {
            // Handle error case
            console.error('Error favoriting article', error);
          }
        );
    }
  }
}