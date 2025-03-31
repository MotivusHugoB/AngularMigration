import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

/**
 * Interface for Comment data structure
 */
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

/**
 * Comments Service
 * 
 * Migrated from AngularJS Comments service to Angular 12.
 * Changes made:
 * - Converted to @Injectable with providedIn: 'root' for tree-shaking
 * - Replaced $http with Angular's HttpClient
 * - Converted promise-based methods to Observable-based using RxJS
 * - Added TypeScript interfaces for type safety
 * - Implemented proper error handling with catchError
 * - Replaced AppConstants with environment configuration
 */
@Injectable({
  providedIn: 'root' // Makes this service tree-shakable in Angular
})
export class CommentsService {
  private apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  /**
   * Add a comment to an article
   * @param slug - Article slug
   * @param payload - Comment body text
   * @returns Observable of the created Comment
   */
  add(slug: string, payload: string): Observable<Comment> {
    return this.http.post<{ comment: Comment }>(
      `${this.apiUrl}/articles/${slug}/comments`,
      { comment: { body: payload } }
    ).pipe(
      map(response => response.comment),
      catchError(error => {
        console.error('Error adding comment:', error);
        throw error;
      })
    );
  }

  /**
   * Get all comments for an article
   * @param slug - Article slug
   * @returns Observable of Comment array
   */
  getAll(slug: string): Observable<Comment[]> {
    return this.http.get<{ comments: Comment[] }>(
      `${this.apiUrl}/articles/${slug}/comments`
    ).pipe(
      map(response => response.comments),
      catchError(error => {
        console.error('Error fetching comments:', error);
        throw error;
      })
    );
  }

  /**
   * Delete a comment from an article
   * @param commentId - ID of the comment to delete
   * @param articleSlug - Article slug
   * @returns Observable of the HTTP response
   */
  destroy(commentId: number, articleSlug: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/articles/${articleSlug}/comments/${commentId}`
    ).pipe(
      catchError(error => {
        console.error('Error deleting comment:', error);
        throw error;
      })
    );
  }
}