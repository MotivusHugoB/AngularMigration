import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from '../services/jwt.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

/**
 * AuthInterceptor
 * 
 * Intercepts HTTP requests to:
 * 1. Automatically attach Authorization header with JWT token for API requests
 * 2. Handle 401 Unauthorized responses by clearing token and redirecting
 * 
 * Migrated from AngularJS authInterceptor factory
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {}

  /**
   * Intercept all HTTP requests
   * 
   * @param request The outgoing HTTP request
   * @param next The next interceptor in the chain
   * @returns An observable of the HTTP event stream
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only add auth header for API requests
    if (request.url.indexOf(environment.api_url) === 0 && this.jwtService.get()) {
      // Clone the request to add the token
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.jwtService.get()}`
        }
      });
    }

    // Handle the request and catch any errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized errors
        if (error.status === 401) {
          // Clear JWT token
          this.jwtService.destroy();
          
          // Navigate to home page (Angular equivalent of page refresh)
          this.router.navigateByUrl('/');
        }
        
        // Propagate the error
        return throwError(error);
      })
    );
  }
}