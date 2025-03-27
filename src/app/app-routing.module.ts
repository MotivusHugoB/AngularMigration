import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    // This replaces the abstract 'app' state from ui-router
    // We're using a layout component that will contain the router-outlet
    component: /* Layout component will be defined in a separate file */
    loadChildren: () => import('./features/layout/layout.module').then(m => m.LayoutModule),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'editor',
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/editor/editor.module').then(m => m.EditorModule)
      },
      {
        path: 'article/:slug',
        loadChildren: () => import('./features/articles/articles.module').then(m => m.ArticlesModule)
      },
      {
        path: 'profile/:username',
        loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  },
  // Redirect any unknown paths to home
  { 
    path: '**', 
    redirectTo: '' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Enable HTML5 mode (remove hash from URL)
      // This was commented out in the original config, so we'll keep it disabled
      useHash: true,
      
      // Preload all lazy-loaded modules after the app loads
      // This improves UX by making subsequent navigation faster
      preloadingStrategy: PreloadAllModules,
      
      // Enable route tracing for debugging (disable in production)
      enableTracing: false,
      
      // Scroll to top on navigation
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // The auth interceptor from the original code will be implemented
  // in a separate file as an HTTP_INTERCEPTORS provider in the core module
}