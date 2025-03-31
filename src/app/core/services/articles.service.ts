import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

/**
 * Interface for article query configuration
 */
export interface ArticleQueryConfig {
  /** Type of articles to fetch - 'all' or 'feed' */
  type: 'all' | 'feed';
  /** Optional filters to apply to the query as URL parameters */
  filters?: { [key: string]: string };
}

/**
 * Interface for article data
 */
export interface Article {
  slug?: string;
  title?: string;
  description?: string;
  body?: string;
  tagList?: string[];
  createdAt?: string;
  updatedAt?: string;
  favorited?: boolean;
  favoritesCount?: number;
  author?: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
  [key: string]: any; // Allow for additional properties
}

/**
 * Service for handling article-related API operations
 * Migrated from AngularJS Articles service to Angular 12
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable and available as a singleton
})
export class ArticlesService {
  private apiUrl = environment.api_url; // Assuming API URL is stored in environment

  constructor(private http: HttpClient) {}

  /**
   * Query articles based on configuration
   * @param config Configuration object for the query
   * @returns Observable of articles data
   */
  query(config: ArticleQueryConfig): Observable<{ articles: Article[], articlesCount: number }> {
    // Determine the endpoint based on the type
    const endpoint = config.type === 'feed' ? '/articles/feed' : '/articles';
    
    // Create HttpParams from filters if they exist
    let params = new HttpParams();
    if (config.filters) {
      Object.keys(config.filters).forEach(key => {
        params = params.set(key, config.filters[key]);
      });
    }

    return this.http.get<{ articles: Article[], articlesCount: number }>(`${this.apiUrl}${endpoint}`, { params })
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  /**
   * Get a single article by slug
   * @param slug The article's slug
   * @returns Observable of article data
   */
  get(slug: string): Observable<Article> {
    // Validate slug before making the request
    if (!slug || !slug.trim()) {
      return throwError(() => new Error('Article slug is empty'));
    }

    return this.http.get<{ article: Article }>(`${this.apiUrl}/articles/${slug}`)
      .pipe(
        map(response => response.article),
        catchError(err => throwError(() => err))
      );
  }

  /**
   * Delete an article
   * @param slug The article's slug
   * @returns Observable of the HTTP response
   */
  destroy(slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/articles/${slug}`)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  /**
   * Create or update an article
   * @param article The article data to save
   * @returns Observable of the saved article
   */
  save(article: Article): Observable<Article> {
    let url = `${this.apiUrl}/articles`;
    let method: 'post' | 'put' = 'post';
    
    // If article has a slug, we're updating an existing article
    if (article.slug) {
      url = `${this.apiUrl}/articles/${article.slug}`;
      method = 'put';
      
      // Create a copy to avoid modifying the original object
      const articleCopy = { ...article };
      delete articleCopy.slug;
      article = articleCopy;
    }

    // Use the appropriate HTTP method
    return (method === 'post' 
      ? this.http.post<{ article: Article }>(url, { article })
      : this.http.put<{ article: Article }>(url, { article })
    ).pipe(
      map(response => response.article),
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Favorite an article
   * @param slug The article's slug
   * @returns Observable of the HTTP response
   */
  favorite(slug: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/articles/${slug}/favorite`, {})
      .pipe(
        catchError(err => throwError(() => err))
      );
  }

  /**
   * Unfavorite an article
   * @param slug The article's slug
   * @returns Observable of the HTTP response
   */
  unfavorite(slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/articles/${slug}/favorite`)
      .pipe(
        catchError(err => throwError(() => err))
      );
  }
}