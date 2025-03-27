import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as marked from 'marked';

// Import models
import { Article } from '../../../core/models/article.model';
import { Comment } from '../../../core/models/comment.model';
import { User } from '../../../core/models/user.model';

// Import services
import { ArticleService } from '../../../core/services/article.service';
import { CommentsService } from '../../../core/services/comments.service';
import { UserService } from '../../../core/services/user.service';

interface CommentForm {
  isSubmitting: boolean;
  body: string;
  errors: {[key: string]: string[]};
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article: Article;
  comments: Comment[] = [];
  currentUser: User;
  canModify: boolean = false;
  isDeleting: boolean = false;
  processedBody: SafeHtml;
  commentForm: CommentForm = {
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
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit() {
    // Retrieve the prefetched article
    this.route.data.subscribe(
      (data: { article: Article }) => {
        this.article = data.article;
        
        // Set page title
        this.titleService.setTitle(this.article.title);
        
        // Process markdown and sanitize HTML
        this.processedBody = this.sanitizer.bypassSecurityTrustHtml(
          marked(this.article.body, { sanitize: true })
        );
        
        // Load the current user's data
        this.userService.currentUser.subscribe(
          (userData: User) => {
            this.currentUser = userData;
            
            // Check if the current user is the author of this article
            this.canModify = (this.currentUser && this.currentUser.username === this.article.author.username);
          }
        );
        
        // Load comments on this article
        this.populateComments();
      }
    );
  }

  /**
   * Fetches all comments for this article
   */
  populateComments() {
    this.commentsService.getAll(this.article.slug)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  /**
   * Resets the comment form to its initial state
   */
  resetCommentForm() {
    this.commentForm = {
      isSubmitting: false,
      body: '',
      errors: {}
    };
  }

  /**
   * Adds a new comment to the article
   */
  addComment() {
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
   * Deletes a comment from the article
   * @param commentId - The ID of the comment to delete
   * @param index - The index of the comment in the comments array
   */
  deleteComment(commentId: string, index: number) {
    this.commentsService.destroy(commentId, this.article.slug)
      .subscribe(
        success => {
          this.comments.splice(index, 1);
        }
      );
  }

  /**
   * Deletes the current article
   */
  deleteArticle() {
    this.isDeleting = true;
    
    this.articleService.destroy(this.article.slug)
      .pipe(
        finalize(() => {
          this.isDeleting = false;
        })
      )
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }
}