import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Profile } from '../../../../core/models/profile.model';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.scss']
})
export class ProfileArticlesComponent implements OnInit {
  // The profile for this page, resolved by Angular Router
  profile: Profile;
  
  // Current profile state (main or favorites)
  profileState: string;
  
  // Configuration for the article list component
  listConfig: {
    type: string;
    filters?: {
      author?: string;
      favorited?: string;
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {
    // Initialize the list config with default type
    this.listConfig = { type: 'all' };
  }

  ngOnInit(): void {
    // Get the profile data from the route resolver
    this.route.data.subscribe(data => {
      this.profile = data.profile;
      
      // Determine which tab is active based on the current route
      const url = this.router.url;
      this.profileState = url.includes('/favorites') ? 'favorites' : 'main';
      
      this.configureList();
    });
  }

  /**
   * Configure the article list based on the current profile state
   * - 'main' tab shows articles authored by the profile
   * - 'favorites' tab shows articles favorited by the profile
   */
  private configureList(): void {
    if (this.profileState === 'main') {
      // Filter by author for the main profile page
      this.listConfig.filters = { author: this.profile.username };
      
      // Set page title
      this.titleService.setTitle(`@${this.profile.username}`);
    } else if (this.profileState === 'favorites') {
      // Filter by favorited for the favorites page
      this.listConfig.filters = { favorited: this.profile.username };
      
      // Set page title
      this.titleService.setTitle(`Articles favorited by ${this.profile.username}`);
    }
  }
}