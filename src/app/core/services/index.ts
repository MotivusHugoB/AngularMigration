/**
 * Core services index file
 * 
 * This file exports all service providers that need to be included in the CoreModule.
 * In Angular, we use @Injectable decorator instead of AngularJS's service registration.
 * 
 * Migration notes:
 * - Removed AngularJS module definition
 * - Converted to TypeScript exports
 * - Each service is now provided in the CoreModule using the providedIn property
 *   or explicitly in the CoreModule providers array
 */

// Import all services
import { UserService } from './user.service';
import { JwtService } from './jwt.service';
import { ProfileService } from './profile.service';
import { ArticlesService } from './articles.service';
import { CommentsService } from './comments.service';
import { TagsService } from './tags.service';

// Export all services so they can be imported elsewhere
export {
  UserService,
  JwtService,
  ProfileService,
  ArticlesService,
  CommentsService,
  TagsService
};

// Export an array of all service providers for use in the CoreModule
export const services = [
  UserService,
  JwtService,
  ProfileService,
  ArticlesService,
  CommentsService,
  TagsService
];