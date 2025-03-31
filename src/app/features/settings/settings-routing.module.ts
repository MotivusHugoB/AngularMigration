import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'settings',
    // Component will be imported in the settings module
    loadChildren: () => import('./settings.module').then(m => m.SettingsModule),
    canActivate: [AuthGuard],
    data: {
      title: 'Settings'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }