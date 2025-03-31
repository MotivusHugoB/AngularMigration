/**
 * Tag model representing a tag entity in the application
 * 
 * This model is used throughout the application to represent article tags
 * and is used by the TagsService to handle tag-related operations.
 */
export interface Tag {
  /**
   * The unique identifier or name of the tag
   */
  name: string;
}