import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../core/services/profile.service';
import { UserService } from '../../../core/services/user.service';
import { Profile } from '../../../core/models/profile.model';
import { User } from '../../../core/models/user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // Profile data from the API
  profile: Profile;
  
  // Flag to determine if the current user is viewing their own profile
  isUser = false;
  
  // Track loading state
  isLoading = true;
  
  // Track error state
  error: string = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get the profile data from the route resolver
    // In Angular, we typically use route resolvers to fetch data before component initialization
    this.route.data.pipe(take(1)).subscribe(
      (data: { profile: Profile }) => {
        this.profile = data.profile;
        this.isLoading = false;
        
        // Check if the current user is viewing their own profile
        this.userService.currentUser.pipe(take(1)).subscribe(
          (userData: User) => {
            if (userData) {
              console.log(this.profile);
              this.isUser = (userData.username === this.profile.username);
            } else {
              this.isUser = false;
            }
          },
          err => {
            this.error = 'Could not load user data';
            console.error('Error fetching current user:', err);
          }
        );
      },
      err => {
        this.isLoading = false;
        this.error = 'Could not load profile';
        console.error('Error fetching profile:', err);
      }
    );
  }
}