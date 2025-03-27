// src/environments/environment.ts
// This file replaces the app.config.js by storing environment-specific configuration
// Angular uses this pattern instead of having configuration in JavaScript modules

export const environment = {
  production: false,
  // API URL would typically be defined here
  apiUrl: 'https://conduit.productionready.io/api',
  // We can also define other environment-specific settings
  // that were previously in the AppConfig
  
  // HTML5 mode configuration (previously commented out in AngularJS)
  useHtml5Mode: false,
  
  // Default route (previously set with $urlRouterProvider.otherwise)
  defaultRoute: '/'
};

// Note: The actual routing configuration from app.config.js will be moved to app-routing.module.ts
// The HTTP interceptor will be moved to core/interceptors/auth.interceptor.ts
// The User service's verifyAuth method will be called in an auth guard or app initialization