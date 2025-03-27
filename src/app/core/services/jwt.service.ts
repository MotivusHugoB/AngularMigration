import { Injectable } from '@angular/core';

/**
 * JWT Service
 * 
 * Handles JSON Web Token operations (save, retrieve, destroy)
 * Migrated from AngularJS JWT service to Angular 12
 * 
 * Changes from AngularJS version:
 * - Converted to @Injectable class with providedIn: 'root' for tree-shaking
 * - Replaced AngularJS DI with Angular DI
 * - Replaced $window with direct window reference
 * - AppConstants replaced with environment configuration
 * - Added TypeScript types for better type safety
 */
@Injectable({
  providedIn: 'root' // Makes service tree-shakable and available application-wide
})
export class JwtService {
  private readonly JWT_KEY: string = 'jwtToken'; // JWT key in localStorage

  constructor() {
    // No dependencies needed as we're using the global window object directly
    // and constants are now imported from environment
  }

  /**
   * Saves JWT token to localStorage
   * @param token - The JWT token string to save
   */
  save(token: string): void {
    window.localStorage.setItem(this.JWT_KEY, token);
  }

  /**
   * Retrieves JWT token from localStorage
   * @returns The stored JWT token or null if not found
   */
  get(): string | null {
    return window.localStorage.getItem(this.JWT_KEY);
  }

  /**
   * Removes JWT token from localStorage
   */
  destroy(): void {
    window.localStorage.removeItem(this.JWT_KEY);
  }
}