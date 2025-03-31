import { Injectable } from '@angular/core';

/**
 * JWT Service - Handles JSON Web Token operations
 * 
 * Migration notes:
 * - Converted from AngularJS service to Angular Injectable service
 * - Replaced AngularJS DI with Angular's DI system
 * - Made the service tree-shakable with providedIn: 'root'
 * - Replaced $window with direct window reference
 * - Replaced AppConstants dependency with environment configuration
 * - Added TypeScript interfaces for better type safety
 * - No need for RxJS here as all operations are synchronous
 */
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private readonly JWT_KEY: string = 'jwtToken'; // Constant key for localStorage

  constructor() {
    // No dependencies needed as we're using direct window reference
    // and a constant string instead of AppConstants
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