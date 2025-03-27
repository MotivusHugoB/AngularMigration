import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

// Define the routes for the Home feature module
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // Store static data in the route configuration (equivalent to title: 'Home')
    data: { 
      title: 'Home' 
    }
    // Note: In AngularJS, this route was accessed via '/'. In Angular, 
    // this empty path will be combined with the parent path when this module
    // is imported in the app-routing.module.ts with a path like 'home'
  }
];

@NgModule({
  // Configure the router module with the routes defined above
  // The forChild method is used because this is a feature module, not the root
  imports: [RouterModule.forChild(routes)],
  // Export RouterModule so the components in the feature module can use router directives
  exports: [RouterModule]
})
export class HomeRoutingModule { }