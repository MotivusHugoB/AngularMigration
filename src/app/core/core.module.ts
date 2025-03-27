import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Services
import { JwtService } from './services/jwt.service';
import { UserService } from './services/user.service';
import { ArticlesService } from './services/articles.service';
import { CommentsService } from './services/comments.service';
import { ProfileService } from './services/profile.service';
import { TagsService } from './services/tags.service';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

/**
 * CoreModule
 * 
 * This module contains all singleton services that should be instantiated only once in the application.
 * It includes:
 * - HTTP interceptors for authentication
 * - Core services for API communication
 * - Guards for route protection
 * 
 * This module should only be imported in the AppModule to ensure services are singletons.
 * The constructor prevents importing this module in any other module.
 */
@NgModule({
  imports: [
    // Angular modules
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    // Core services
    JwtService,
    UserService,
    ArticlesService,
    CommentsService,
    ProfileService,
    TagsService,
    
    // HTTP interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    // Re-export modules that components in other feature modules might need
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class CoreModule {
  /**
   * Guard against importing CoreModule more than once
   * @throws Error if CoreModule is imported more than once
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }

  /**
   * Use this method in the AppModule to ensure CoreModule is properly imported
   * and to avoid circular dependencies when providing app-wide services
   */
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}