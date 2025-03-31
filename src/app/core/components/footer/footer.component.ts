import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../../core/services/app-constants.service';

/**
 * Footer component for the application
 * 
 * Migration notes:
 * - Converted from AngularJS component to Angular @Component
 * - Replaced 'ngInject' with proper Angular DI
 * - Moved template to external file (footer.component.html)
 * - Added OnInit interface for proper lifecycle management
 * - Added proper TypeScript types
 * - AppConstants is now injected via constructor
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  // Application name from constants
  appName: string;
  
  // Current date for copyright year
  date: Date;

  constructor(private appConstants: AppConstants) {
    this.appName = this.appConstants.appName;
    this.date = new Date();
  }

  ngOnInit(): void {
    // Any initialization logic can go here
    // Left empty as original component had no initialization logic
  }
}