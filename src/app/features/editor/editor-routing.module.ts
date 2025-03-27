import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { EditorResolver } from './editor.resolver';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    canActivate: [AuthGuard],
    data: { title: 'Editor' },
    children: [
      {
        path: '',
        component: EditorComponent,
        resolve: {
          article: EditorResolver
        }
      },
      {
        path: ':slug',
        component: EditorComponent,
        resolve: {
          article: EditorResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EditorResolver]
})
export class EditorRoutingModule { }

/**
 * Editor Routing Module
 * 
 * Key changes from AngularJS:
 * 1. Replaced ui-router state with Angular Router configuration
 * 2. Converted 'auth' resolve to AuthGuard for route protection
 * 3. Moved article resolution logic to a dedicated EditorResolver
 * 4. Configured routes to handle both new articles (no slug) and editing (with slug)
 * 5. Set up proper child routes structure
 * 6. Maintained the same route parameter naming (:slug)
 * 7. Preserved the route title in route data
 * 
 * Note: The AuthGuard and EditorResolver need to be implemented separately:
 * - AuthGuard should use User service to check authentication
 * - EditorResolver should handle article fetching and ownership verification
 * - Redirection to home page on error is handled in the resolver
 */