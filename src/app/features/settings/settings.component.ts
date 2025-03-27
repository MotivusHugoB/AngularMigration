import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user.model';
import { Errors } from '../../core/models/errors.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  // Form model to hold user settings data
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

  // Track form submission state
  isSubmitting = false;
  
  // Hold validation errors from API
  errors: Errors = {};

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * Initialize component with current user data
   */
  ngOnInit(): void {
    // Get current user data from the UserService
    const currentUser = this.userService.getCurrentUser();
    
    if (currentUser) {
      this.formData = {
        email: currentUser.email || '',
        bio: currentUser.bio || '',
        image: currentUser.image || '',
        username: currentUser.username || ''
      };
    }
  }

  /**
   * Submit updated user settings to the API
   * On success: Navigate to user profile
   * On error: Display validation errors
   */
  submitForm(): void {
    this.isSubmitting = true;
    this.errors = {};

    this.userService.update(this.formData)
      .pipe(
        // Ensure isSubmitting is set to false when observable completes or errors
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe(
        // Success handler
        (user: User) => {
          // Navigate to profile page using Angular Router (replacing $state.go)
          this.router.navigate(['/profile', user.username]);
        },
        // Error handler
        (err) => {
          this.errors = err.error.errors || {};
        }
      );
  }

  /**
   * Log out the current user
   * This delegates to the UserService logout method
   */
  logout(): void {
    this.userService.logout();
  }
}