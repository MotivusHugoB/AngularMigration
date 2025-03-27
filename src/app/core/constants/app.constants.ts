// src/app/core/constants/app.constants.ts

/**
 * Application constants for the Conduit application
 * 
 * This file contains global constants used throughout the application.
 * - api: Base URL for API requests
 * - jwtKey: Local storage key for storing the JWT token
 * - appName: Application name used for display purposes
 */
export const AppConstants = {
  // API endpoint for production
  api: 'https://conduit.productionready.io/api',
  
  // Uncomment for local development
  // api: 'http://localhost:3000/api',
  
  // Key used for storing JWT token in localStorage
  jwtKey: 'jwtToken',
  
  // Application name
  appName: 'Conduit',
};