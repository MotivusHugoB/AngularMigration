import { Component, Input, OnInit } from '@angular/core';

/**
 * ListErrorsComponent
 * 
 * This component displays a list of error messages.
 * 
 * Migration notes:
 * - Converted from AngularJS component to Angular component
 * - Changed bindings: { errors: '=' } to @Input() errors
 * - Created separate HTML template file
 * - Added TypeScript interface for errors object structure
 * - Implemented OnInit for initialization logic
 * - Added error handling for undefined/null errors
 */

// Interface to define the structure of the errors object
interface Errors {
  [key: string]: string[];
}

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent implements OnInit {
  // Input property to receive errors from parent component
  // Equivalent to the AngularJS '=' binding
  @Input() errors: Errors | null = null;
  
  // Property to store the error messages for display
  errorList: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.updateErrorList();
  }

  // This method is called whenever the errors input changes
  ngOnChanges(): void {
    this.updateErrorList();
  }

  // Helper method to transform errors object into a flat array of messages
  private updateErrorList(): void {
    this.errorList = [];
    
    if (this.errors) {
      // Iterate through each error key and add formatted messages to the list
      Object.keys(this.errors).forEach(key => {
        const messages = this.errors![key];
        if (messages && Array.isArray(messages)) {
          messages.forEach(error => {
            this.errorList.push(`${key} ${error}`);
          });
        }
      });
    }
  }
}