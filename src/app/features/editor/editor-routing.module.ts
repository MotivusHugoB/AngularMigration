import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { EditorArticleResolver } from './resolvers/editor-article.resolver';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./editor.module').then(m => m.EditorModule),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: 'EditorComponent',
        data: { title: 'Editor' }
      },
      {
        path: ':slug',
        component: 'EditorComponent',
        data: { title: 'Editor' },
        resolve: {
          article: EditorArticleResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }