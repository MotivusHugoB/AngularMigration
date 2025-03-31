import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';
import { marked } from 'marked';

// Import models and services
import { Article } from '../../models/article.model';
import { Comment } from '../../models/comment.model';
import { User } from '../../../../core/models/user.model';
import { ArticleService } from '../../services/article.service';
import { CommentsService } from '../../services/comments.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  // Article data
  article: Article;
  comments: Comment[] = [];
  currentUser: User;
  articleBody: SafeHtml;

  // Form model
  commentForm = {
    isSubmitting: false,
    body: '',
    errors: {}
  };

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private commentsService: CommentsService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    // Get the article from the resolver
    this.route.data.subscribe(data => {
      this.article = data.article;
      
      // Set page title
      this.titleService.setTitle(this.article.title);
      
      // Sanitize and render markdown
      this.articleBody = this.sanitizer.bypassSecurityTrustHtml(
        marked(this.article.body, { sanitize: true })
      );
      
      // Load comments
      this.loadComments();
    });
    
    // Get current user
    this.userService.currentUser.subscribe(userData => {
      this.currentUser = userData;
    });
  }

  /**
   * Load all comments for the current article
   */
  loadComments(): void {
    this.commentsService.getAll(this.article.slug)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  /**
   * Reset the comment form to its initial state
   */
  resetCommentForm(): void {
    this.commentForm = {
      isSubmitting: false,
      body: '',
      errors: {}
    };
  }

  /**
   * Add a new comment to the article
   */
  addComment(): void {
    this.commentForm.isSubmitting = true;

    this.commentsService.add(this.article.slug, this.commentForm.body)
      .pipe(
        finalize(() => {
          this.commentForm.isSubmitting = false;
        })
      )
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.resetCommentForm();
        },
        err => {
          this.commentForm.errors = err.error.errors;
        }
      );
  }

  /**
   * Delete a comment from the article
   * @param commentId - The ID of the comment to delete
   * @param index - The index of the comment in the comments array
   */
  deleteComment(commentId: string, index: number): void {
    this.commentsService.destroy(commentId, this.article.slug)
      .subscribe(
        () => {
          this.comments.splice(index, 1);
        }
      );
  }
}