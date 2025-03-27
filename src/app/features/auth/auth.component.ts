import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

/**
 * AuthComponent handles user authentication (login/register)
 * 
 * Migration notes:
 * - Converted AngularJS controller to Angular component with @Component decorator
 * - Replaced $state with Angular Router
 * - Replaced promise-based API calls with Observable pattern
 * - Added reactive forms for better validation and type safety
 * - Implemented OnInit lifecycle hook instead of constructor initialization
 * - Added proper TypeScript interfaces and typing
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  // Form properties
  authForm: FormGroup;
  isSubmitting = false;
  errors: { [key: string]: string } = {};
  
  // UI state properties
  title: string = '';
  authType: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // Create the form group with validators
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Get the current route data to determine if we're in login or register mode
    this.authType = this.route.snapshot.url[0]?.path || '';
    
    // Set page title based on auth type
    this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
    
    // If we're in register mode, add the username field
    if (this.authType === 'register') {
      this.authForm.addControl('username', this.fb.control('', Validators.required));
    }
  }

  /**
   * Handle form submission for both login and register
   */
  submitForm(): void {
    this.isSubmitting = true;
    this.errors = {};
    
    // Get the form values
    const credentials = this.authForm.value;
    
    this.userService.attemptAuth(this.authType, credentials)
      .subscribe(
        // Success callback
        () => {
          this.router.navigateByUrl('/');
        },
        // Error callback
        err => {
          this.errors = err.error.errors || {};
          this.isSubmitting = false;
        }
      );
  }
}