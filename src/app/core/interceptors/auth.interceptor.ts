import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from '../services/jwt.service';
import { AppConstants } from '../../config/app.constants';

/**
 * AuthInterceptor
 * 
 * This interceptor handles authentication for API requests by:
 * 1. Automatically attaching JWT tokens to API requests
 * 2. Handling 401 Unauthorized responses by clearing tokens and refreshing the page
 * 
 * Migration notes:
 * - Converted from AngularJS factory to Angular @Injectable class
 * - Replaced $q promise rejection with RxJS throwError
 * - Replaced $window with native window object
 * - Implemented Angular's HttpInterceptor interface
 * - Added proper TypeScript typing
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(
    private jwtService: JwtService,
    private appConstants: AppConstants
  ) {}

  /**
   * Intercept all HTTP requests to add auth token and handle errors
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only add auth headers to API requests
    if (request.url.indexOf(this.appConstants.api) === 0 && this.jwtService.get()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.jwtService.get()}`
        }
      });
    }

    // Process the request and catch any errors in the response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized errors
        if (error.status === 401) {
          // Clear any stored JWT token
          this.jwtService.destroy();
          
          // Perform a hard page refresh
          window.location.reload();
        }
        
        // Propagate the error
        return throwError(error);
      })
    );
  }
}