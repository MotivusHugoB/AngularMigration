import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../../core/constants/app.constants';

/**
 * Footer component for the application
 * 
 * Migration notes:
 * - Converted AngularJS component to Angular @Component
 * - Injected AppConstants service via constructor
 * - Moved template to external HTML file
 * - Added OnInit interface for lifecycle hook implementation
 * - Added proper TypeScript types
 * - Removed 'ngInject' as Angular DI handles this automatically
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