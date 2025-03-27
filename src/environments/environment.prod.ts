/**
 * Production environment configuration for Angular application
 * 
 * This file replaces the AngularJS app.config.js by extracting the environment-specific
 * configuration values. In Angular, environment files are used to store configuration
 * values that differ between environments (dev, prod, etc.).
 * 
 * The routing configuration from the original file has been moved to app-routing.module.ts
 * The HTTP interceptor configuration has been moved to core/core.module.ts where
 * we register the HTTP_INTERCEPTORS token
 */
export const environment = {
  production: true,
  // API URL would typically be defined here
  apiUrl: 'https://conduit.productionready.io/api',
  
  // We can add other production-specific configuration here
  // For example, if we had analytics or logging configuration:
  // analyticsEnabled: true,
  // logLevel: 'error',
  
  // HTML5 routing mode configuration (equivalent to $locationProvider.html5Mode)
  // This will be used in the AppRoutingModule
  useHtml5Routing: false
};