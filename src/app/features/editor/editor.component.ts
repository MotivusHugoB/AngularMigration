import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { ArticlesService } from '../../core/services/articles.service';
import { Article } from '../../core/models/article.model';
import { Errors } from '../../core/models/errors.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  /**
   * The article being edited or created
   */
  article: Article = {} as Article;
  
  /**
   * Form control for tag input field
   */
  tagField = new FormControl();
  
  /**
   * Flag to track form submission state
   */
  isSubmitting = false;
  
  /**
   * Object to store validation errors
   */
  errors: Errors = { errors: {} };

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Initialize component with article data if editing an existing article
   */
  ngOnInit() {
    // Check if we're editing an existing article or creating a new one
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
   * Add a tag to the article's tag list
   */
  addTag() {
    // Get the tag value from the form control
    const tag = this.tagField.value;
    
    // Only add the tag if it's not already in the tag list
    if (tag && !this.article.tagList.includes(tag)) {
      this.article.tagList.push(tag);
    }
    
    // Clear the input
    this.tagField.reset('');
  }

  /**
   * Remove a tag from the article's tag list
   * @param tagName The tag to remove
   */
  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  /**
   * Submit the article form
   */
  submit() {
    this.isSubmitting = true;
    this.errors = { errors: {} };

    // Use RxJS operators for handling the API call
    this.articlesService.save(this.article)
      .pipe(
        finalize(() => this.isSubmitting = false)
      )
      .subscribe(
        // Success callback
        (article: Article) => {
          this.router.navigate(['/article', article.slug]);
        },
        // Error callback
        (err) => {
          this.errors = err;
        }
      );
  }
}