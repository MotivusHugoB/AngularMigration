import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

// Interfaces for type safety
export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
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
}

export interface ArticleResponse {
  article: Article;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface ArticleQueryConfig {
  type: 'all' | 'feed';
  filters?: {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
  };
}

@Injectable({
  providedIn: 'root' // Makes the service tree-shakable and available app-wide
})
export class ArticlesService {
  private apiUrl = environment.api_url; // Using environment config instead of AppConstants

  constructor(private http: HttpClient) {}

  /**
   * Query articles based on type and filters
   * 
   * @param config Configuration object for the query
   * @returns Observable with articles data
   */
  query(config: ArticleQueryConfig): Observable<ArticlesResponse> {
    // Build the URL based on the type (feed or all articles)
    const url = `${this.apiUrl}/articles${config.type === 'feed' ? '/feed' : ''}`;
    
    // Convert filters to HttpParams if they exist
    let params = new HttpParams();
    if (config.filters) {
      Object.keys(config.filters).forEach(key => {
        if (config.filters[key] !== undefined) {
          params = params.set(key, config.filters[key]);
        }
      });
    }

    // Return the HTTP request as an Observable
    return this.http.get<ArticlesResponse>(url, { params }).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Get a single article by slug
   * 
   * @param slug The article's slug
   * @returns Observable with article data
   */
  get(slug: string): Observable<Article> {
    // Validate slug before making the request
    if (!slug || !slug.trim()) {
      return throwError(() => new Error('Article slug is empty'));
    }

    return this.http.get<ArticleResponse>(`${this.apiUrl}/articles/${slug}`).pipe(
      map(response => response.article),
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Delete an article
   * 
   * @param slug The article's slug
   * @returns Observable of the HTTP response
   */
  destroy(slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/articles/${slug}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Create or update an article
   * 
   * @param article The article data to save
   * @returns Observable with the saved article
   */
  save(article: Article): Observable<Article> {
    let url = `${this.apiUrl}/articles`;
    let method: 'post' | 'put' = 'post';
    
    // If article has a slug, we're updating an existing article
    if (article.slug) {
      url = `${url}/${article.slug}`;
      method = 'put';
      
      // Create a copy to avoid modifying the original object
      const articleCopy = { ...article };
      delete articleCopy.slug;
      article = articleCopy;
    }

    // Use the appropriate HTTP method based on whether we're creating or updating
    return (method === 'post' 
      ? this.http.post<ArticleResponse>(url, { article })
      : this.http.put<ArticleResponse>(url, { article })
    ).pipe(
      map(response => response.article),
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Favorite an article
   * 
   * @param slug The article's slug
   * @returns Observable of the HTTP response
   */
  favorite(slug: string): Observable<ArticleResponse> {
    return this.http.post<ArticleResponse>(
      `${this.apiUrl}/articles/${slug}/favorite`, 
      {}
    ).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Unfavorite an article
   * 
   * @param slug The article's slug
   * @returns Observable of the HTTP response
   */
  unfavorite(slug: string): Observable<ArticleResponse> {
    return this.http.delete<ArticleResponse>(
      `${this.apiUrl}/articles/${slug}/favorite`
    ).pipe(
      catchError(err => throwError(() => err))
    );
  }
}