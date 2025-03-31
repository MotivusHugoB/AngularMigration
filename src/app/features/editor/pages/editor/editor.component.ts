import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../../../core/models/article.model';
import { ArticlesService } from '../../../../core/services/articles.service';
import { Errors } from '../../../../core/models/errors.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  // Article being edited or created
  article: Article = {} as Article;
  
  // Form state
  isSubmitting = false;
  
  // Validation errors from the API
  errors: Errors = {} as Errors;
  
  // Tag input field
  tagField = '';

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Initialize a new article if none was passed
    this.route.data.subscribe(data => {
      if (data.article) {
        this.article = data.article;
      } else {
        this.article = {
          title: '',
          description: '',
          body: '',
          tagList: []
        } as Article;
      }
    });
  }

  /**
   * Adds a tag to the article's tagList if it doesn't already exist
   * Clears the tag input field after adding
   */
  addTag() {
    // Ensure we're not adding a duplicate tag
    if (this.tagField && !this.article.tagList.includes(this.tagField)) {
      this.article.tagList.push(this.tagField);
      this.tagField = '';
    }
  }

  /**
   * Removes a tag from the article's tagList
   * @param tagName The tag to remove
   */
  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  /**
   * Submits the article form to create/update an article
   * Navigates to the article page on success
   * Displays validation errors on failure
   */
  submit() {
    this.isSubmitting = true;
    
    // Create or update the article via the API
    this.articlesService.save(this.article).subscribe(
      // Success callback
      (article: Article) => {
        this.router.navigate(['/article', article.slug]);
      },
      // Error callback
      (err) => {
        this.isSubmitting = false;
        this.errors = err.error.errors;
      }
    );
  }
}