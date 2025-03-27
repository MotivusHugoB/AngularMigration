import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Import environment configuration instead of AppConstants
import { environment } from '../../../environments/environment';

// Define interfaces for type safety
export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface CommentsResponse {
  comments: Comment[];
}

export interface CommentResponse {
  comment: Comment;
}

/**
 * Comments service handles all comment-related API operations
 * Migrated from AngularJS Comments service to Angular Injectable service
 * - Replaced $http with HttpClient
 * - Converted promises to Observables
 * - Added TypeScript interfaces for type safety
 * - Implemented error handling with RxJS operators
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable and available app-wide
})
export class CommentsService {
  // API URL from environment configuration
  private apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  /**
   * Add a comment to an article
   * @param slug - Article slug identifier
   * @param payload - Comment body text
   * @returns Observable of the created comment
   */
  add(slug: string, payload: string): Observable<Comment> {
    return this.http
      .post<CommentResponse>(`${this.apiUrl}/articles/${slug}/comments`, {
        comment: { body: payload }
      })
      .pipe(
        map(response => response.comment),
        catchError(error => {
          // Log error and transform to a more user-friendly format
          console.error('Error adding comment:', error);
          return throwError(() => new Error('Failed to add comment. Please try again.'));
        })
      );
  }

  /**
   * Get all comments for an article
   * @param slug - Article slug identifier
   * @returns Observable of comments array
   */
  getAll(slug: string): Observable<Comment[]> {
    return this.http
      .get<CommentsResponse>(`${this.apiUrl}/articles/${slug}/comments`)
      .pipe(
        map(response => response.comments),
        catchError(error => {
          console.error('Error fetching comments:', error);
          return throwError(() => new Error('Failed to load comments. Please try again.'));
        })
      );
  }

  /**
   * Delete a comment from an article
   * @param commentId - ID of the comment to delete
   * @param articleSlug - Article slug identifier
   * @returns Observable of the HTTP response
   */
  destroy(commentId: number, articleSlug: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/articles/${articleSlug}/comments/${commentId}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting comment:', error);
          return throwError(() => new Error('Failed to delete comment. Please try again.'));
        })
      );
  }
}