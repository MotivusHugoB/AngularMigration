import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { finalize } from 'rxjs/operators';

/**
 * AuthComponent handles user authentication (login/register)
 * 
 * Migration notes:
 * - Converted AngularJS controller to Angular component with @Component decorator
 * - Replaced $state with Angular Router
 * - Implemented reactive forms instead of template-driven forms
 * - Used RxJS operators for handling async operations
 * - Added proper TypeScript interfaces and typing
 * - Implemented OnInit lifecycle hook instead of constructor initialization
 * - Added form validation
 */
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  // Form properties
  authForm: FormGroup;
  
  // UI state properties
  title: string = '';
  authType: string = '';
  isSubmitting: boolean = false;
  errors: { [key: string]: string } = {};

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
    // Get route data to determine if this is login or register
    this.authType = this.router.url.includes('login') ? 'login' : 'register';
    
    // Set page title based on auth type
    this.title = this.authType === 'login' ? 'Sign In' : 'Sign Up';
    
    // If this is the register page, add username field
    if (this.authType === 'register') {
      this.authForm.addControl('username', this.fb.control('', Validators.required));
    }
  }

  /**
   * Handle form submission for both login and register
   * Replaces the original submitForm method with RxJS approach
   */
  submitForm(): void {
    this.isSubmitting = true;
    this.errors = {};
    
    // Get the form values
    const credentials = this.authForm.value;
    
    this.userService.attemptAuth(this.authType, credentials)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe(
        // Success handler
        () => {
          this.router.navigateByUrl('/');
        },
        // Error handler
        (err) => {
          this.errors = err?.error?.errors || { 'Error': 'Authentication failed' };
        }
      );
  }
}