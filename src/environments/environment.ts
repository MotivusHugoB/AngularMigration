// src/environments/environment.ts
// This file replaces the AngularJS app.constants.js with Angular environment configuration
// Angular environments allow for different configurations based on the build target (dev, prod, etc.)

export const environment = {
  production: false,
  api: 'https://conduit.productionready.io/api',
  // Commented out local API endpoint - can be enabled during development
  // api: 'http://localhost:3000/api',
  jwtKey: 'jwtToken',
  appName: 'Conduit'
};

// Note: To use this configuration in your application, import from environments/environment
// For example: import { environment } from '../environments/environment';
// Then reference as: environment.api, environment.jwtKey, etc.

// For production builds, values from environment.prod.ts will be used instead
// You should create a corresponding environment.prod.ts file with production values