import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

/**
 * ListPaginationComponent
 * 
 * This component handles pagination for article lists.
 * It displays page numbers and allows users to navigate between pages.
 * 
 * Migration notes:
 * - Converted from AngularJS component to Angular component
 * - Replaced $scope.$emit with an Angular Output EventEmitter
 * - Changed bindings from '=' (two-way) to Angular @Input properties
 * - Moved template to external HTML file
 * - Added proper TypeScript types
 * - Implemented OnInit interface for initialization logic
 */
@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html'
})
export class ListPaginationComponent implements OnInit {
  // Input properties replacing AngularJS bindings
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  
  // Output event to replace $scope.$emit
  @Output() setPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  /**
   * Generates an array of page numbers based on the total number of pages
   * @param total The total number of pages
   * @returns An array of page numbers
   */
  pageRange(total: number): number[] {
    const pages: number[] = [];

    for (let i = 0; i < total; i++) {
      pages.push(i + 1);
    }

    return pages;
  }

  /**
   * Changes the current page and emits an event to notify parent components
   * @param number The page number to change to
   */
  changePage(number: number): void {
    this.setPage.emit(number);
  }
}