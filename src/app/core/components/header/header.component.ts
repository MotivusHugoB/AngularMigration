import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Import the Angular equivalents of the services
import { AppConstants } from '../../../core/services/app-constants.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Define properties with proper TypeScript types
  appName: string;
  currentUser: User | null = null;
  
  // Subscription to handle cleanup on component destruction
  private userSubscription: Subscription;

  // Inject dependencies using Angular's DI system
  constructor(
    private appConstants: AppConstants,
    private userService: UserService
  ) {
    // Initialize properties from injected services
    this.appName = this.appConstants.appName;
  }

  ngOnInit(): void {
    // Get the initial user state
    this.currentUser = this.userService.getCurrentUser();
    
    // Subscribe to user changes (equivalent to $scope.$watch)
    this.userSubscription = this.userService.currentUser.subscribe(
      (newUser: User | null) => {
        this.currentUser = newUser;
      },
      (error) => {
        console.error('Error getting current user:', error);
        // Handle error appropriately - could show a notification or fallback behavior
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up subscriptions when the component is destroyed
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}