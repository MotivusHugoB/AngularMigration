import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Import environment instead of AppConstants
import { environment } from '../../../environments/environment';

// Define interfaces for type safety
export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

interface ProfileResponse {
  profile: Profile;
}

/**
 * Service responsible for profile-related API operations
 * Migrated from AngularJS Profile service to Angular service with RxJS
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable and available application-wide
})
export class ProfileService {
  // API URL from environment configuration
  private apiUrl = environment.api;

  /**
   * Constructor with Angular's dependency injection
   * Replaced AngularJS $http with Angular's HttpClient
   * Replaced AppConstants with environment configuration
   */
  constructor(private http: HttpClient) {}

  /**
   * Get a user profile by username
   * @param username - The username to fetch profile for
   * @returns Observable of Profile
   */
  get(username: string): Observable<Profile> {
    return this.http.get<ProfileResponse>(`${this.apiUrl}/profiles/${username}`)
      .pipe(
        map(response => response.profile),
        catchError(error => {
          // Proper error handling with RxJS
          return throwError(() => new Error(`Error fetching profile: ${error.message}`));
        })
      );
  }

  /**
   * Follow a user
   * @param username - The username of the user to follow
   * @returns Observable of Profile
   */
  follow(username: string): Observable<Profile> {
    return this.http.post<ProfileResponse>(`${this.apiUrl}/profiles/${username}/follow`, {})
      .pipe(
        map(response => response.profile),
        catchError(error => {
          return throwError(() => new Error(`Error following user: ${error.message}`));
        })
      );
  }

  /**
   * Unfollow a user
   * @param username - The username of the user to unfollow
   * @returns Observable of Profile
   */
  unfollow(username: string): Observable<Profile> {
    return this.http.delete<ProfileResponse>(`${this.apiUrl}/profiles/${username}/follow`)
      .pipe(
        map(response => response.profile),
        catchError(error => {
          return throwError(() => new Error(`Error unfollowing user: ${error.message}`));
        })
      );
  }
}