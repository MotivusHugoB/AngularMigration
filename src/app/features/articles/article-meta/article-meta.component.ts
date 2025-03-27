import { Component, Input } from '@angular/core';
import { Article } from '../../../core/models/article.model';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html',
  styleUrls: ['./article-meta.component.scss']
})
export class ArticleMetaComponent {
  /**
   * The article object containing metadata such as author, date, etc.
   * Migrated from AngularJS '=' binding to Angular @Input()
   */
  @Input() article!: Article;

  /**
   * Note: The original AngularJS component used transclude: true
   * In Angular, we use <ng-content> in the template to achieve the same functionality
   * This allows parent components to inject content into this component
   */
  constructor() { }
}