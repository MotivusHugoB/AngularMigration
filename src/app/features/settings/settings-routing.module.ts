import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { AuthGuard } from '../../core/guards/auth.guard';

// Define the routes for the settings feature
const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [AuthGuard], // Protects this route - only authenticated users can access
    data: {
      title: 'Settings' // Static configuration data that can be used for page titles
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

/**
 * Settings Routing Module
 * 
 * Migration notes:
 * - Converted ui-router state 'app.settings' to a route configuration
 * - Replaced controller/controllerAs with component-based approach
 * - Converted resolve.auth to an AuthGuard for route protection
 * - The AuthGuard implements the logic from User.ensureAuthIs(true)
 * - Route is configured for lazy loading (should be loaded in app-routing.module.ts)
 * - Using data property to store the title, which can be used by a title service
 * - The empty path means this will match the parent path (e.g., '/settings')
 */