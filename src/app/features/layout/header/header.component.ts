import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Application name from environment constants
  appName: string = environment.appName;
  
  // Current user object
  currentUser: User | null = null;
  
  // Subscription to track user changes
  private userSubscription: Subscription = new Subscription();

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Initialize current user from the service
    this.currentUser = this.userService.getCurrentUser();
    
    // Subscribe to user changes (equivalent to $scope.$watch)
    this.userSubscription = this.userService.currentUser.subscribe(
      (newUser: User | null) => {
        this.currentUser = newUser;
      },
      error => {
        console.error('Error getting current user:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Clean up subscription to prevent memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}