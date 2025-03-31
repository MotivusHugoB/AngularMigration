import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

/**
 * TitleService
 * 
 * This service replaces the AngularJS AppRun function that was responsible for
 * setting the page title based on state changes. In Angular, we use a combination
 * of the Title service from @angular/platform-browser and Router events to achieve
 * the same functionality.
 * 
 * Instead of using $rootScope.$on('$stateChangeSuccess'), we now subscribe to
 * Router NavigationEnd events and extract the title from route data.
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable and available as a singleton
})
export class TitleService {
  // Base application name - replaces AppConstants.appName
  private appName = 'Conduit'; // This should be injected from an environment or config service

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * Initialize the title service by subscribing to router events
   * This replaces the $rootScope.$on('$stateChangeSuccess') handler
   */
  init(): void {
    this.router.events.pipe(
      // Only proceed for NavigationEnd events (equivalent to $stateChangeSuccess)
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
      // Get the route's data
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      // Set the page title based on route data
      this.setPageTitle(data['title']);
    });
  }

  /**
   * Sets the page title
   * Replaces the $rootScope.setPageTitle function from AngularJS
   * 
   * @param title - The title to set for the current page
   */
  setPageTitle(title?: string): void {
    let pageTitle = '';
    
    if (title) {
      pageTitle += title;
      pageTitle += ' \u2014 '; // Unicode em dash, same as in original
    }
    
    pageTitle += this.appName;
    
    // Use Angular's Title service to update the document title
    this.titleService.setTitle(pageTitle);
  }
}