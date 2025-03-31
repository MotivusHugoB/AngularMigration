import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../../core/models/article.model';

/**
 * ArticlePreviewComponent
 * 
 * This component displays a preview of an article, including its metadata.
 * 
 * Migration notes:
 * - Converted from AngularJS component to Angular @Component
 * - Changed bindings: '=' to @Input() for one-way binding
 * - Using proper TypeScript typing with Article model
 * - Template URL updated to follow Angular CLI conventions
 * - Added OnInit interface for proper lifecycle management
 */
@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})
export class ArticlePreviewComponent implements OnInit {
  // Convert AngularJS two-way binding '=' to Angular @Input()
  // Using proper typing with Article interface/class
  @Input() article: Article;

  constructor() { }

  ngOnInit(): void {
    // Initialize component if needed
    // Replaces $onInit from AngularJS
  }
}