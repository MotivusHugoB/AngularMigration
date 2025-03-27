import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Comment } from '../../../core/models/comment.model';
import { User } from '../../../core/models/user.model';

/**
 * CommentComponent displays a single comment in an article
 * 
 * Migration notes:
 * - Converted AngularJS 'Comment' component to Angular @Component
 * - Changed '=' binding to @Input property
 * - Changed '&' binding to @Output EventEmitter
 * - Moved dependency injection to constructor with Angular DI
 * - Added OnInit interface to follow Angular lifecycle pattern
 * - Added proper TypeScript interfaces for Comment and User
 * - Implemented ngOnInit to handle initialization logic (replacing implicit controller init)
 * - Moved template to external file (comment.component.html)
 */
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
  // Convert AngularJS '=' binding to @Input
  @Input() data!: Comment;
  
  // Convert AngularJS '&' binding to @Output EventEmitter
  @Output() deleteCb: EventEmitter<Comment> = new EventEmitter<Comment>();
  
  // Component properties
  canModify: boolean = false;
  
  /**
   * Inject dependencies using Angular DI
   * UserService replaces the AngularJS User service
   */
  constructor(private userService: UserService) {}
  
  /**
   * Initialize component
   * Replaces logic that was in the AngularJS controller constructor
   */
  ngOnInit(): void {
    // Check if current user is the author of the comment
    const currentUser: User | null = this.userService.getCurrentUser();
    
    if (currentUser) {
      this.canModify = (currentUser.username === this.data.author.username);
    } else {
      this.canModify = false;
    }
  }
  
  /**
   * Delete comment handler
   * Emits the delete event to parent component
   */
  deleteComment(): void {
    this.deleteCb.emit(this.data);
  }
}