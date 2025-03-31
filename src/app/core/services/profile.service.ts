import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Import environment instead of AppConstants
import { environment } from '../../../../environments/environment';

/**
 * Interface for Profile data returned from API
 */
export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

/**
 * Interface for API response containing profile data
 */
interface ProfileResponse {
  profile: Profile;
}

/**
 * Profile service responsible for managing user profiles
 * Migrated from AngularJS service to Angular service:
 * - Replaced $http with HttpClient
 * - Converted promises to Observables
 * - Added TypeScript interfaces for type safety
 * - Made service tree-shakable with providedIn: 'root'
 * - Added proper error handling with RxJS operators
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable
})
export class ProfileService {
  // API URL from environment configuration
  private apiUrl = environment.api;

  /**
   * Constructor with Angular dependency injection
   * @param http HttpClient for making API requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Get a user profile by username
   * @param username The username to fetch profile for
   * @returns Observable with Profile data
   */
  get(username: string): Observable<Profile> {
    return this.http.get<ProfileResponse>(`${this.apiUrl}/profiles/${username}`)
      .pipe(
        map(response => response.profile),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Follow a user
   * @param username The username of the user to follow
   * @returns Observable with updated Profile data
   */
  follow(username: string): Observable<Profile> {
    return this.http.post<ProfileResponse>(`${this.apiUrl}/profiles/${username}/follow`, {})
      .pipe(
        map(response => response.profile),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Unfollow a user
   * @param username The username of the user to unfollow
   * @returns Observable with updated Profile data
   */
  unfollow(username: string): Observable<Profile> {
    return this.http.delete<ProfileResponse>(`${this.apiUrl}/profiles/${username}/follow`)
      .pipe(
        map(response => response.profile),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Error handler for HTTP requests
   * @param error The error response
   * @returns Observable that errors with formatted message
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}