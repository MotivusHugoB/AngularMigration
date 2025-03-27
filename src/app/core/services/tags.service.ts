import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

/**
 * Interface for the tags response from the API
 */
interface TagsResponse {
  tags: string[];
}

/**
 * Tags service responsible for fetching article tags from the API
 * 
 * Migration notes:
 * - Converted from AngularJS service to Angular Injectable service
 * - Replaced $http with Angular's HttpClient
 * - Converted promise-based API to Observable-based API
 * - Added proper TypeScript interfaces for type safety
 * - Implemented error handling with RxJS operators
 * - Made the service tree-shakable with providedIn: 'root'
 * - Replaced AppConstants with environment configuration
 * - Removed JWT dependency as it wasn't used in the original service
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable
})
export class TagsService {
  
  /**
   * API URL from environment configuration
   * Replaces the AppConstants.api from AngularJS
   */
  private apiUrl = environment.api;

  /**
   * Constructor with Angular dependency injection
   * @param http Angular HttpClient for making API requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Gets all available tags from the API
   * @returns Observable of string array containing all tags
   */
  getAll(): Observable<string[]> {
    return this.http.get<TagsResponse>(`${this.apiUrl}/tags`)
      .pipe(
        map(response => response.tags),
        catchError(error => {
          // Log the error or handle it as needed
          console.error('Error fetching tags:', error);
          // Re-throw the error to be handled by the component
          throw error;
        })
      );
  }
}