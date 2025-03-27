import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Import services
import { UserService } from '@app/core/services/user.service';
import { TagsService } from '@app/core/services/tags.service';
import { AppConstants } from '@app/core/constants';
import { ArticleListConfig } from '@app/core/models/article-list-config.model';
import { ArticleListComponent } from '@app/shared/article-list/article-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Properties
  appName: string = this.appConstants.appName;
  tags: string[] = [];
  tagsLoaded: boolean = false;
  listConfig: ArticleListConfig;

  /**
   * Constructor with Angular dependency injection
   * Replaces AngularJS 'ngInject' with proper constructor injection
   */
  constructor(
    private userService: UserService,
    private tagsService: TagsService,
    private appConstants: AppConstants
  ) {
    // Initialize listConfig based on authentication status
    // Replaces the conditional assignment in the original constructor
    this.listConfig = {
      type: this.userService.getCurrentUser() ? 'feed' : 'all'
    };
  }

  /**
   * Angular lifecycle hook that replaces the constructor logic
   * for async operations
   */
  ngOnInit(): void {
    // Get list of all tags using RxJS Observable instead of Promise
    this.tagsService.getAll().pipe(
      tap((tags: string[]) => {
        this.tagsLoaded = true;
        this.tags = tags;
      })
    ).subscribe({
      // Error handling added (not present in original code)
      error: (err) => {
        console.error('Failed to load tags', err);
        this.tagsLoaded = true; // Still mark as loaded to avoid UI hanging
      }
    });
  }

  /**
   * Changes the current article list type
   * Replaces the $scope.$broadcast with direct component interaction
   * 
   * @param newList The new list type to display
   */
  changeList(newList: string): void {
    // In Angular, we don't use $scope.$broadcast
    // Instead, we update the listConfig property directly
    // The article-list component will react to this change via @Input binding
    this.listConfig = { type: newList };
  }
}