import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ArticlesService } from '../../../../core/services/articles.service';
import { UserService } from '../../../../core/services/user.service';
import { Article } from '../../../../core/models/article.model';

@Component({
  selector: 'app-article-actions',
  templateUrl: './article-actions.component.html',
  styleUrls: ['./article-actions.component.scss']
})
export class ArticleActionsComponent implements OnInit {
  // Using Input decorator for one-way binding instead of AngularJS's '=' binding
  @Input() article: Article;
  
  // Component properties
  canModify = false;
  isDeleting = false;

  constructor(
    private articlesService: ArticlesService,
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * Initialize component and check if current user can modify the article
   * Replaces the constructor logic from AngularJS
   */
  ngOnInit(): void {
    // Check if current user is the author of the article
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.canModify = (currentUser.username === this.article.author.username);
    } else {
      this.canModify = false;
    }
  }

  /**
   * Delete the current article and navigate to home page
   * Uses RxJS operators instead of promise chains
   */
  deleteArticle(): void {
    this.isDeleting = true;
    
    // Using RxJS pipe and finalize to handle the loading state
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