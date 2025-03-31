import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    // This replaces the abstract 'app' state from ui-router
    // We're using a layout component that will contain the <router-outlet>
    component: /* Layout component will be defined separately */
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    canActivate: [AuthGuard], // Converted from the auth resolve
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
        loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'editor',
        loadChildren: () => import('./features/editor/editor.module').then(m => m.EditorModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'article',
        loadChildren: () => import('./features/article/article.module').then(m => m.ArticleModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  },
  // Redirect any unknown paths to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    // Preserving hash-based routing as mentioned in the original comment
    // To use HTML5 routing, use: RouterModule.forRoot(routes, { useHash: false })
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }