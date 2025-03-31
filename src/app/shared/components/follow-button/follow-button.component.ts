import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

// Import the services and models
// Note: These imports assume you've already migrated these services and models
import { ProfileService } from '../../../core/services/profile.service';
import { UserService } from '../../../core/services/user.service';
import { Profile } from '../../../core/models/profile.model';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.scss']
})
export class FollowButtonComponent implements OnInit {
  // Convert '=' binding to @Input() with proper typing
  @Input() user: Profile;
  
  // Track submission state
  isSubmitting = false;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // No initialization logic needed from the original component
  }

  /**
   * Handles the follow/unfollow action
   * - Redirects to register if user is not authenticated
   * - Toggles following status based on current state
   * - Uses RxJS operators for proper error handling and state management
   */
  submit(): void {
    this.isSubmitting = true;

    // Check if user is logged in
    if (!this.userService.getCurrentUser()) {
      this.router.navigateByUrl('/register');
      return;
    }

    // Determine whether to follow or unfollow based on current state
    const request = this.user.following ? 
      this.profileService.unfollow(this.user.username) : 
      this.profileService.follow(this.user.username);

    // Use RxJS operators for better error handling and state management
    request.pipe(
      // Always set isSubmitting to false when complete
      finalize(() => {
        this.isSubmitting = false;
      })
    ).subscribe(
      // On successful response, toggle the following state
      () => {
        this.user.following = !this.user.following;
      },
      // Error handling (not present in original code but added as best practice)
      error => {
        console.error('Error following/unfollowing user', error);
        // Could add toast notification or other error feedback here
      }
    );
  }
}