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
 * Tags service responsible for fetching tags from the API
 * 
 * Migration notes:
 * - Converted from AngularJS service to Angular Injectable service
 * - Replaced $http with Angular's HttpClient
 * - Converted promise-based API to Observable-based using RxJS
 * - Added proper TypeScript typing
 * - Made service tree-shakable with providedIn: 'root'
 * - Replaced AppConstants with environment configuration
 * - Removed JWT dependency as it wasn't used in the original service
 * - Added error handling with RxJS operators
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable
})
export class TagsService {
  
  /**
   * Constructor with dependency injection
   * @param http Angular HttpClient for making API requests
   */
  constructor(
    private http: HttpClient
  ) {}

  /**
   * Fetches all available tags from the API
   * @returns Observable of string array containing all tags
   */
  getAll(): Observable<string[]> {
    return this.http.get<TagsResponse>(`${environment.api}/tags`)
      .pipe(
        map(response => response.tags),
        catchError(error => {
          // Log the error to console and rethrow
          console.error('Error fetching tags:', error);
          throw error;
        })
      );
  }
}