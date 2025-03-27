import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

/**
 * User model interface representing the user data structure
 */
export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  [key: string]: any; // For any additional fields that might be present
}

/**
 * Interface for authentication credentials
 */
export interface Credentials {
  email: string;
  password: string;
  username?: string;
}

/**
 * Interface for user update fields
 */
export interface UserUpdateFields {
  email?: string;
  username?: string;
  password?: string;
  image?: string;
  bio?: string;
  [key: string]: any; // For any additional fields
}

/**
 * Interface for API responses containing user data
 */
export interface UserResponse {
  user: User;
}