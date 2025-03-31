import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { Comment } from '../../../../core/models/comment.model';
import { User } from '../../../../core/models/user.model';

/**
 * Comment Component
 * 
 * This component displays a single comment in an article.
 * 
 * Migration notes:
 * - Converted from AngularJS component to Angular @Component
 * - Changed 'data' binding from two-way ('=') to Input property
 * - Changed 'deleteCb' from '&' (expression binding) to EventEmitter
 * - Moved dependency injection from constructor to Angular DI system
 * - Implemented OnInit lifecycle hook instead of checking in constructor
 * - Added proper TypeScript interfaces for Comment and User
 * - Moved template to external HTML file
 */
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  // Input property for the comment data
  @Input() data!: Comment;
  
  // Output event emitter to handle comment deletion
  @Output() deleteCb = new EventEmitter<Comment>();
  
  // Flag to determine if the current user can modify this comment
  canModify: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Check if the current user is the author of the comment
    const currentUser: User | null = this.userService.getCurrentUser();
    
    if (currentUser) {
      this.canModify = (currentUser.username === this.data.author.username);
    } else {
      this.canModify = false;
    }
  }

  // Method to emit the delete event
  deleteComment(): void {
    this.deleteCb.emit(this.data);
  }
}