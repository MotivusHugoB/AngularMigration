import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../core/services/user.service';

/**
 * ShowAuthedDirective - Angular directive that shows or hides an element based on authentication status
 * 
 * This directive replaces the AngularJS 'show-authed' directive. It conditionally displays
 * elements based on whether a user is authenticated and the value of the showAuthed input.
 * 
 * Usage:
 * <div [appShowAuthed]="true">Only shown when user is authenticated</div>
 * <div [appShowAuthed]="false">Only shown when user is NOT authenticated</div>
 */
@Directive({
  selector: '[appShowAuthed]'
})
export class ShowAuthedDirective implements OnInit, OnDestroy {
  // Input that determines whether to show element when authenticated (true) or when not authenticated (false)
  @Input('appShowAuthed') showAuthed: boolean = false;
  
  // Subscription to user changes to be cleaned up on destroy
  private userSubscription: Subscription;

  constructor(
    private userService: UserService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Subscribe to the current user observable from the UserService
    // This replaces the $watch functionality from AngularJS
    this.userSubscription = this.userService.currentUser.subscribe(
      (user) => {
        // If user is authenticated
        if (user) {
          if (this.showAuthed) {
            // Show element if showAuthed is true
            this.renderer.setStyle(this.el.nativeElement, 'display', 'inherit');
          } else {
            // Hide element if showAuthed is false
            this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
          }
        } else {
          // If user is not authenticated
          if (this.showAuthed) {
            // Hide element if showAuthed is true
            this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
          } else {
            // Show element if showAuthed is false
            this.renderer.setStyle(this.el.nativeElement, 'display', 'inherit');
          }
        }
      }
    );
  }

  ngOnDestroy() {
    // Clean up subscription when directive is destroyed to prevent memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}