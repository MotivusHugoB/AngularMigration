import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

/**
 * Home feature routing configuration
 * 
 * This module handles routing for the home page feature:
 * - Maps the root path '/' to the HomeComponent
 * - Preserves the original route title from AngularJS
 */
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }