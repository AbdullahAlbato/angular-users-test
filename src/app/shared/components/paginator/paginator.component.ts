/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PaginatorComponent implements OnChanges {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;

  @Input() rows: number = 10;
  @Input() page: number = 1;
  @Input() totalRecords: number = 0;
  @Input() theme: 'primary' | 'secondary' = 'primary';
  @Input() showInfo: boolean = true;
  @Input() loading: boolean = false;

  @Output() onPageChange: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();

  first: number = 0;

  ngOnChanges(): void {
    this.first = (this.page - 1) * this.rows;
  }

  handlePageChange(event: PageEvent): void {
    this.first = event.pageIndex * event.pageSize;
    this.rows = event.pageSize;
    this.page = event.pageIndex + 1;
    this.onPageChange.emit(event);
  }

  get currentPageRange(): string {
    const firstItem = (this.page - 1) * this.rows + 1;
    const lastItem = Math.min(this.page * this.rows, this.totalRecords);
    return `${firstItem}-${lastItem}`;
  }
}
