import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../core/services/user.service';

/**
 * ShowAuthedDirective - Angular directive that shows or hides elements based on authentication status
 * 
 * This directive replaces the AngularJS 'show-authed' directive. It controls the visibility
 * of elements based on whether a user is authenticated and the value of the showAuthed input.
 * 
 * Usage:
 * <div [showAuthed]="true">Only shown when user is logged in</div>
 * <div [showAuthed]="false">Only shown when user is logged out</div>
 */
@Directive({
  selector: '[showAuthed]'
})
export class ShowAuthedDirective implements OnInit, OnDestroy {
  // Input that determines when to show the element (true = show when authenticated)
  @Input() showAuthed: boolean;
  
  // Subscription to track and clean up user status subscription
  private userSubscription: Subscription;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Subscribe to the current user observable from UserService
    this.userSubscription = this.userService.currentUser.subscribe(
      (user) => {
        // If user is authenticated
        if (user) {
          if (this.showAuthed) {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'inherit');
          } else {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
          }
        // If user is not authenticated
        } else {
          if (this.showAuthed) {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
          } else {
            this.renderer.setStyle(this.element.nativeElement, 'display', 'inherit');
          }
        }
      }
    );
  }

  ngOnDestroy() {
    // Clean up subscription to prevent memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}