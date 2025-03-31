import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * User model representing the application user
 * This model replaces the AngularJS User class and provides
 * TypeScript typing for user properties
 */
export interface User {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
  [key: string]: any; // For any additional properties
}

/**
 * Credentials interface for login/register
 */
export interface Credentials {
  email: string;
  password: string;
  username?: string;
}

/**
 * User update fields interface
 */
export interface UserUpdateFields {
  email?: string;
  username?: string;
  password?: string;
  image?: string;
  bio?: string;
}

/**
 * Auth response interface
 */
export interface AuthResponse {
  user: User;
}

/**
 * This model file defines the User interfaces used throughout the application
 * The original AngularJS User service has been split:
 * - This file contains the data models
 * - The actual service functionality is moved to user.service.ts
 * 
 * This separation follows Angular best practices by keeping models
 * separate from services that operate on them.
 */