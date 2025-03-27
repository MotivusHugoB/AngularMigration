import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NotAuthenticatedGuard } from '../../core/guards/not-authenticated.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AuthComponent,
        canActivate: [NotAuthenticatedGuard],
        data: {
          title: 'Sign in',
          authType: 'login'
        }
      },
      {
        path: 'register',
        component: AuthComponent,
        canActivate: [NotAuthenticatedGuard],
        data: {
          title: 'Sign up',
          authType: 'register'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }