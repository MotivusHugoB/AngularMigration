import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

// Import the User service from core services
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';
import { Errors } from '../../../../core/models/errors.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  // Form data model to hold user settings
  formData: {
    email: string;
    bio: string;
    image: string;
    username: string;
  } = {
    email: '',
    bio: '',
    image: '',
    username: ''
  };

  // Track submission state
  isSubmitting = false;
  
  // Error handling
  errors: Errors = {};

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * Initialize component with current user data
   * Replaces the constructor initialization in AngularJS
   */
  ngOnInit(): void {
    // Get current user data to populate the form
    // In Angular, we access the current user from the service
    this.userService.getCurrentUser().subscribe(
      (userData: User) => {
        if (userData) {
          this.formData = {
            email: userData.email,
            bio: userData.bio || '',
            image: userData.image || '',
            username: userData.username
          };
        }
      }
    );
  }

  /**
   * Submit form to update user settings
   * Converted from promise-based approach to Observable with RxJS operators
   */
  submitForm(): void {
    this.isSubmitting = true;
    this.errors = {};

    this.userService.update(this.formData)
      .pipe(
        // Use finalize to handle cleanup regardless of success/error
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe(
        // Success handler
        (user: User) => {
          // Navigate to profile page after successful update
          // Converted from $state.go to Angular Router
          this.router.navigate(['/profile', user.username]);
        },
        // Error handler
        (err) => {
          this.errors = err.errors || {};
        }
      );
  }

  /**
   * Logout user and redirect
   * Bound directly to the template
   */
  logout(): void {
    this.userService.logout();
  }
}