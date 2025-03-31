import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArticlesService } from '../../../core/services/articles.service';
import { Article } from '../../../core/models/article.model';
import { ListConfig } from '../../../core/models/list-config.model';
import { ArticleListConfig } from '../../../core/models/article-list-config.model';
import { ArticleListService } from './article-list.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit, OnDestroy {
  /**
   * Maximum number of articles to display per page
   * Equivalent to the 'limit' binding in AngularJS
   */
  @Input() limit: number;

  /**
   * Configuration for the article list
   * Equivalent to the 'listConfig' binding in AngularJS
   */
  @Input() listConfig: ArticleListConfig;

  /**
   * Current list of articles
   */
  list: Article[] = [];

  /**
   * Loading state indicator
   */
  loading = false;

  /**
   * Subscriptions to be cleaned up on component destruction
   */
  private subscriptions: Subscription[] = [];

  constructor(
    private articlesService: ArticlesService,
    private articleListService: ArticleListService
  ) {}

  ngOnInit(): void {
    // Initialize the list with the provided configuration
    this.setListTo(this.listConfig);

    // Subscribe to list change events (replacing $scope.$on)
    this.subscriptions.push(
      this.articleListService.setListTo$.subscribe(
        (newList: ArticleListConfig) => {
          this.setListTo(newList);
        }
      )
    );

    // Subscribe to page change events (replacing $scope.$on)
    this.subscriptions.push(
      this.articleListService.setPageTo$.subscribe(
        (pageNumber: number) => {
          this.setPageTo(pageNumber);
        }
      )
    );
  }

  ngOnDestroy(): void {
    // Clean up subscriptions to prevent memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  /**
   * Sets the current list configuration and refreshes the article list
   * @param newList - The new list configuration to apply
   */
  setListTo(newList: ArticleListConfig): void {
    // Set the current list to an empty array
    this.list = [];

    // Set listConfig to the new list's config
    this.listConfig = newList;

    this.runQuery();
  }

  /**
   * Sets the current page number and refreshes the article list
   * @param pageNumber - The page number to navigate to
   */
  setPageTo(pageNumber: number): void {
    this.listConfig.currentPage = pageNumber;
    this.runQuery();
  }

  /**
   * Executes the article query based on current configuration
   */
  runQuery(): void {
    // Show the loading indicator
    this.loading = true;
    this.listConfig = this.listConfig || {};

    // Create an object for this query
    const queryConfig: ListConfig = {
      type: this.listConfig.type || undefined,
      filters: this.listConfig.filters || {}
    };

    // Set the limit filter from the component's attribute
    queryConfig.filters.limit = this.limit;

    // If there is no page set, set page as 1
    if (!this.listConfig.currentPage) {
      this.listConfig.currentPage = 1;
    }

    // Add the offset filter
    queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));

    // Run the query using RxJS instead of promises
    this.articlesService.query(queryConfig).subscribe(
      (data) => {
        this.loading = false;

        // Update list and total pages
        this.list = data.articles;

        this.listConfig.totalPages = Math.ceil(data.articlesCount / this.limit);
      },
      (error) => {
        this.loading = false;
        console.error('Error fetching articles', error);
        // Could add error handling UI here
      }
    );
  }
}