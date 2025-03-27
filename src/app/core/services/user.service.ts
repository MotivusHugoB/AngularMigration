import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { JwtService } from './jwt.service';
import { environment } from '../../../environments/environment';

// User model interface
export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  [key: string]: any; // For any additional fields
}

/**
 * User service responsible for authentication and user management
 * Migrated from AngularJS User service to Angular service with RxJS
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable and available app-wide
})
export class UserService {
  // BehaviorSubject to track and share the current user state across the app
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  // Convenience getter for current user value
  get getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {}

  /**
   * Attempts to authenticate a user (login or register)
   * @param type 'login' or 'register'
   * @param credentials User credentials (email, password, etc.)
   * @returns Observable with user data
   */
  attemptAuth(type: string, credentials: any): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    
    return this.http.post<{user: User}>(
      `${environment.api}/users${route}`,
      { user: credentials }
    ).pipe(
      map(response => {
        // Save JWT token and update current user
        this.jwtService.save(response.user.token);
        this.currentUserSubject.next(response.user);
        return response.user;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Updates user information
   * @param fields Fields to update
   * @returns Observable with updated user data
   */
  update(fields: any): Observable<User> {
    return this.http.put<{user: User}>(
      `${environment.api}/user`,
      { user: fields }
    ).pipe(
      map(response => {
        // Update current user with new data
        this.currentUserSubject.next(response.user);
        return response.user;
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Logs out the current user
   * Clears token and navigates to home page with reload
   */
  logout(): void {
    this.currentUserSubject.next(null);
    this.jwtService.destroy();
    
    // Navigate to current route with reload to refresh the app state
    // This replaces the AngularJS $state.go with reload functionality
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  /**
   * Verifies if the user is authenticated
   * @returns Observable boolean indicating auth status
   */
  verifyAuth(): Observable<boolean> {
    // Check for JWT token
    if (!this.jwtService.get()) {
      return of(false);
    }

    // If we already have the current user, no need to fetch again
    if (this.getCurrentUser) {
      return of(true);
    }

    // Fetch current user from API
    return this.http.get<{user: User}>(
      `${environment.api}/user`,
      {
        headers: new HttpHeaders({
          Authorization: `Token ${this.jwtService.get()}`
        })
      }
    ).pipe(
      map(response => {
        this.currentUserSubject.next(response.user);
        return true;
      }),
      catchError(() => {
        this.jwtService.destroy();
        return of(false);
      })
    );
  }

  /**
   * Ensures the authentication state matches the expected value
   * @param bool Expected authentication state
   * @returns Observable boolean indicating if auth state matches expectation
   */
  ensureAuthIs(bool: boolean): Observable<boolean> {
    return this.verifyAuth().pipe(
      map(authValid => {
        if (authValid !== bool) {
          // Navigate to home if auth state doesn't match expectation
          this.router.navigateByUrl('/');
          return false;
        }
        return true;
      })
    );
  }

  /**
   * Populate current user data from JWT token (useful on app initialization)
   */
  populate(): void {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.get()) {
      this.http.get<{user: User}>(
        `${environment.api}/user`,
        {
          headers: new HttpHeaders({
            Authorization: `Token ${this.jwtService.get()}`
          })
        }
      ).pipe(
        tap(
          data => this.currentUserSubject.next(data.user),
          err => {
            this.jwtService.destroy();
            this.currentUserSubject.next(null);
          }
        )
      ).subscribe();
    } else {
      // Remove any potential remnants of previous auth states
      this.jwtService.destroy();
      this.currentUserSubject.next(null);
    }
  }
}