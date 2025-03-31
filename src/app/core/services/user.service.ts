import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

// Import services and models
import { JwtService } from './jwt.service';
import { AppConstants } from '../../config/app.constants';

// User model interface
export interface User {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
  [key: string]: any; // For any additional fields
}

// Auth credentials interface
export interface Credentials {
  email: string;
  password: string;
  username?: string;
}

/**
 * UserService handles authentication and user management
 * Migrated from AngularJS User service to Angular service with RxJS
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable and available as a singleton
})
export class UserService {
  // BehaviorSubject to track and broadcast current user state
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private appConstants: AppConstants,
    private router: Router
  ) {}

  /**
   * Get the current user value without subscribing to the Observable
   */
  get getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Attempt authentication (login or register)
   * @param type 'login' or 'register'
   * @param credentials User credentials
   */
  attemptAuth(type: 'login' | 'register', credentials: Credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    
    return this.http.post<{user: User}>(
      `${this.appConstants.api}/users${route}`, 
      { user: credentials }
    ).pipe(
      map(response => response.user),
      tap(user => {
        this.jwtService.save(user.token);
        this.currentUserSubject.next(user);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Update user information
   * @param fields Fields to update
   */
  update(fields: Partial<User>): Observable<User> {
    return this.http.put<{user: User}>(
      `${this.appConstants.api}/user`,
      { user: fields }
    ).pipe(
      map(response => response.user),
      tap(user => {
        this.currentUserSubject.next(user);
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  /**
   * Logout the current user
   */
  logout(): void {
    this.currentUserSubject.next(null);
    this.jwtService.destroy();
    // Navigate to current route with reload to refresh the state
    this.router.navigate([this.router.url], { 
      replaceUrl: true,
      onSameUrlNavigation: 'reload'
    });
  }

  /**
   * Verify if the user is authenticated
   * Replaced promise-based implementation with Observable
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
    const headers = new HttpHeaders({
      'Authorization': `Token ${this.jwtService.get()}`
    });

    return this.http.get<{user: User}>(
      `${this.appConstants.api}/user`,
      { headers }
    ).pipe(
      tap(response => {
        this.currentUserSubject.next(response.user);
      }),
      map(() => true),
      catchError(() => {
        this.jwtService.destroy();
        return of(false);
      })
    );
  }

  /**
   * Ensure authentication state matches the expected value
   * @param bool Expected authentication state
   */
  ensureAuthIs(bool: boolean): Observable<boolean> {
    return this.verifyAuth().pipe(
      tap(authValid => {
        if (authValid !== bool) {
          this.router.navigate(['/']);
        }
      }),
      map(authValid => authValid === bool)
    );
  }
}