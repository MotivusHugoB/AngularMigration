import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

// Import services
import { ProfileService } from '../../../core/services/profile.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { Profile } from '../../../core/models/profile.model';

@Component({
  selector: 'app-follow-btn',
  templateUrl: './follow-btn.component.html'
})
export class FollowBtnComponent implements OnInit {
  // Convert AngularJS '=' binding to Angular @Input
  // Use proper TypeScript typing for the user property
  @Input() user: Profile;
  
  // Track submission state
  isSubmitting = false;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // No initialization logic needed, but implementing OnInit as a best practice
  }

  /**
   * Handle follow/unfollow action
   * - Checks if user is authenticated
   * - Toggles follow status based on current state
   * - Uses RxJS operators for proper async handling
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

    // Use RxJS operators for handling async operations
    request.pipe(
      // Ensure isSubmitting is set to false when operation completes
      finalize(() => {
        this.isSubmitting = false;
      })
    ).subscribe(
      // On successful response
      (profile: Profile) => {
        this.user.following = !this.user.following;
      },
      // Error handling
      err => {
        console.error('Error following/unfollowing user', err);
        // Note: We don't reset the following state on error as the server state hasn't changed
      }
    );
  }
}