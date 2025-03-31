import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

// Import services and models
// Note: These would need to be created as part of the migration
import { UserService } from '../../../../core/services/user.service';
import { TagsService } from '../../../../core/services/tags.service';
import { AppConstants } from '../../../../core/services/app-constants.service';
import { User } from '../../../../core/models/user.model';
import { ArticleListConfig } from '../../../../shared/models/article-list-config.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Properties
  appName: string;
  tags: string[] = [];
  tagsLoaded = false;
  listConfig: ArticleListConfig;
  
  // Current user
  currentUser: User | null = null;

  /**
   * Constructor with Angular dependency injection
   * Replaces AngularJS 'ngInject' with proper Angular DI
   */
  constructor(
    private userService: UserService,
    private tagsService: TagsService,
    private appConstants: AppConstants
  ) {
    // Initialize properties
    this.appName = this.appConstants.appName;
    
    // Initialize list config based on auth status
    // Note: In Angular, we'll use the currentUser from the service directly
    this.listConfig = {
      type: this.userService.getCurrentUser() ? 'feed' : 'all'
    };
  }

  /**
   * Angular lifecycle hook that replaces the constructor logic in AngularJS
   * Fetches initial data when component initializes
   */
  ngOnInit(): void {
    // Get the current user
    this.currentUser = this.userService.getCurrentUser();
    
    // Get list of all tags
    // Converting promise-based API to Observable with proper error handling
    this.tagsService.getAll().pipe(
      tap(tags => {
        this.tags = tags;
        this.tagsLoaded = true;
      }),
      catchError(error => {
        console.error('Error fetching tags', error);
        this.tagsLoaded = true;
        return of([]);  // Return empty array on error
      })
    ).subscribe();
  }

  /**
   * Changes the current article list type
   * Replaces $scope.$broadcast with a service-based approach
   * @param newList The new list type to display
   */
  changeList(newList: string): void {
    // In Angular, we use a service to communicate between components
    // instead of $scope.$broadcast
    this.listConfig = { type: newList };
    
    // Emit the change through a service
    // This would be implemented in a shared service that other components subscribe to
    // Example: this.articleListService.setListConfig(this.listConfig);
  }
}