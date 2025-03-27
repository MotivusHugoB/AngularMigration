import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

/**
 * TitleService
 * 
 * This service replaces the AngularJS AppRun function that was responsible for
 * setting the page title based on state changes. In Angular, we use the Router
 * events to detect navigation changes and update the title accordingly.
 * 
 * Instead of using $rootScope which doesn't exist in Angular, we use Angular's
 * Title service to manage the document title.
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable and available app-wide
})
export class TitleService {
  // Store the application name (replaces AppConstants.appName)
  private appName = 'Conduit'; // This should be injected from an environment config or app config service

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * Initialize the title service by subscribing to router events
   * This replaces the $stateChangeSuccess event listener in AngularJS
   */
  init() {
    this.router.events.pipe(
      // Filter to only NavigationEnd events (equivalent to $stateChangeSuccess)
      filter(event => event instanceof NavigationEnd),
      // Get the activated route
      map(() => this.activatedRoute),
      // Navigate to the deepest route
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      // Get route data
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      // Set the page title based on route data (equivalent to toState.title)
      this.setPageTitle(data.title);
    });
  }

  /**
   * Set the page title
   * This replaces the $rootScope.setPageTitle helper method
   * 
   * @param title - The title to set for the current page
   */
  setPageTitle(title?: string): void {
    let pageTitle = '';
    
    if (title) {
      pageTitle += title;
      pageTitle += ' \u2014 '; // Unicode em dash
    }
    
    pageTitle += this.appName;
    
    // Set the document title using Angular's Title service
    this.titleService.setTitle(pageTitle);
  }

  /**
   * Get the current page title
   * Added for completeness to allow components to read the current title
   */
  getPageTitle(): string {
    return this.titleService.getTitle();
  }
}