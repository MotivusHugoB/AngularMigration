import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/**
 * ListPaginationComponent
 * 
 * This component handles pagination for lists of items.
 * It displays page numbers and allows users to navigate between pages.
 * 
 * Migration notes:
 * - Converted AngularJS component to Angular @Component
 * - Replaced $scope.$emit with an EventEmitter for proper parent-child communication
 * - Changed bindings to @Input properties
 * - Added @Output for page change events
 * - Removed dependency on $scope
 * - Added proper TypeScript types
 * - Template is now referenced via templateUrl relative to the component
 */
@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html',
  styleUrls: ['./list-pagination.component.scss']
})
export class ListPaginationComponent implements OnInit {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Output() setPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    // Initialize component (replaces $onInit)
  }

  /**
   * Generates an array of page numbers based on the total number of pages
   * @param total The total number of pages
   * @returns An array of page numbers starting from 1
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
   * @param number The page number to navigate to
   */
  changePage(number: number): void {
    // Instead of using $scope.$emit, we use an EventEmitter
    this.setPage.emit(number);
  }
}