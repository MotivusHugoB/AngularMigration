import { Component, Input } from '@angular/core';
import { Article } from '../../../core/models/article.model';

/**
 * ArticleMetaComponent
 * 
 * This component displays metadata about an article, including author information
 * and publication date. It's a direct conversion from the AngularJS component.
 * 
 * Migration notes:
 * - Converted AngularJS component to Angular @Component
 * - Changed bindings: { article: '=' } to @Input() article
 * - Replaced templateUrl path to follow Angular conventions
 * - Added proper TypeScript typing with Article model
 * - Maintained transclude functionality using ng-content in the template
 */
@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss']
})
export class ArticleMetaComponent {
  // Convert AngularJS two-way binding '=' to Angular @Input()
  @Input() article: Article;
  
  constructor() { }
}