import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { UserService } from '../../../../core/services/user.service';
import { Profile } from '../../../../core/models/profile.model';
import { User } from '../../../../core/models/user.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // Profile data retrieved from the API
  profile: Profile;
  
  // Flag to determine if the current user is viewing their own profile
  isUser = false;
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // In Angular, we typically get resolved data from the route
    // This assumes profile data is resolved in the route configuration
    this.route.data.pipe(take(1)).subscribe(data => {
      this.profile = data.profile;
      
      // Check if the current user is viewing their own profile
      this.userService.currentUser.pipe(take(1)).subscribe(
        (currentUser: User) => {
          if (currentUser) {
            console.log(this.profile);
            this.isUser = (currentUser.username === this.profile.username);
          } else {
            this.isUser = false;
          }
        }
      );
    });
  }
}