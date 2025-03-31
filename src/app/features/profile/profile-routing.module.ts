import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';
import { ProfileResolver } from './profile.resolver';

const routes: Routes = [
  {
    path: '@:username',
    component: ProfileComponent,
    resolve: {
      profile: ProfileResolver
    },
    children: [
      {
        path: '',
        component: ProfileArticlesComponent,
        data: { 
          title: 'Profile',
          listType: 'all'
        }
      },
      {
        path: 'favorites',
        component: ProfileArticlesComponent,
        data: { 
          title: 'Favorites',
          listType: 'favorites'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }