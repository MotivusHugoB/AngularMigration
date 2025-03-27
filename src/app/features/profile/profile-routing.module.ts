import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
          listType: 'all' // Custom data to differentiate between main profile and favorites
        }
      },
      {
        path: 'favorites',
        component: ProfileArticlesComponent,
        data: { 
          title: 'Favorites',
          listType: 'favorites' // Custom data to differentiate between main profile and favorites
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileResolver]
})
export class ProfileRoutingModule { }