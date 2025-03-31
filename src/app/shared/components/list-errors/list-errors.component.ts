import { Component, Input, OnInit } from '@angular/core';

/**
 * ListErrorsComponent
 * 
 * This component displays a list of error messages.
 * 
 * Migration notes:
 * - Converted from AngularJS component to Angular component
 * - Changed '=' binding to @Input() property
 * - Created a separate template file for the HTML
 * - Added TypeScript interface for errors structure
 * - Added OnInit interface for proper lifecycle management
 */

// Interface to define the structure of errors
interface Errors {
  [key: string]: string[];
}

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent implements OnInit {
  // Convert AngularJS two-way binding '=' to Angular @Input
  @Input() errors: Errors;
  
  // Property to store the error messages for display
  errorList: string[] = [];

  constructor() {}

  ngOnInit() {
    this.updateErrorList();
  }

  // Watch for changes to the errors input
  ngOnChanges() {
    this.updateErrorList();
  }

  /**
   * Process errors object into a flat array of error messages
   */
  updateErrorList() {
    this.errorList = [];
    
    if (this.errors) {
      // Loop through each error field
      for (const field in this.errors) {
        if (this.errors.hasOwnProperty(field)) {
          // Add each error message to the list
          this.errors[field].forEach((error: string) => {
            this.errorList.push(`${field} ${error}`);
          });
        }
      }
    }
  }
}