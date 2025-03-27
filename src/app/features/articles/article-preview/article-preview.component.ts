import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../core/models/article.model';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {
  /**
   * The article to be displayed in the preview
   * Migrated from AngularJS '=' binding to Angular @Input()
   */
  @Input() article: Article;

  constructor() { }

  ngOnInit(): void {
    // Initialize component if needed
    // Replaces $onInit from AngularJS
  }
}