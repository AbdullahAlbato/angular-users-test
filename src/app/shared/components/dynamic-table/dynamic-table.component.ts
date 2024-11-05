/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { MediaSizeEnum } from '../../../core/enums/common.enum';
import { LayoutService } from '../../../core/services/common/layout.service';
import { ElementService } from '../../../core/services/common/element.service';
import {
  DTableFilterData,
  DynamicTableAction,
  DynamicTableActionLoader,
  DynamicTableCol,
  DynamicTableFieldItem,
  DynamicTableFilter,
} from '../../../core/models/common.model';
@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DynamicTableComponent<TData> implements OnInit, OnChanges {
  @Input() columns: DynamicTableCol[] = [];
  @Input() dataSource: TData[] = [];
  @Input() actions: DynamicTableAction[] = [];
  @Input() filtersVariant: 'inline' | 'sidebar' = 'inline';
  @Input() tableCardModeSize: MediaSizeEnum = MediaSizeEnum.DownXs;
  @Input() pagination: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };
  @Input() loading: boolean = false;
  @Input() selectedFilters: unknown;
  @Input() noDataTitle: string = '';
  @Input() noDataMessage: string = '';
  @Input() enableRowSelection: boolean = false;
  @Input() showSidebarFilters: boolean = false;
  @Input() dataKey: string = '';
  @Input() actionsLoading!: DynamicTableActionLoader;
  @Output() onRowSelection: EventEmitter<TData> = new EventEmitter<TData>();
  @Output() onFilter: EventEmitter<DTableFilterData<TData>> = new EventEmitter<
    DTableFilterData<TData>
  >();
  @Output() onPageChange: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();
  @Output() onCloseSidebarFilters: EventEmitter<void> =
    new EventEmitter<void>();

  filters: Map<string, DynamicTableFilter> = new Map<
    string,
    DynamicTableFilter
  >();
  filtersValue: Map<string, any> = new Map<string, any>();
  isCallInitFilters: boolean = false;
  showTableCardMode: boolean = false;
  @ViewChild('dTableContainer')
  private dTableContainer!: ElementRef<HTMLDivElement>;
  readonly ALL = 'ALL';

  constructor(
    private readonly layoutService: LayoutService,
    private elementService: ElementService
  ) {}

  ngOnInit(): void {
    this.detectSmallTable();
    this.initFilters();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('dataSource', this.pagination);

    if (
      changes?.['selectedFilters']?.firstChange &&
      changes['selectedFilters']?.currentValue
    ) {
      this.initFilters();
      this.setFiltersValues(changes['selectedFilters'].currentValue);
    }
  }

  initFilters(): void {
    if (this.isCallInitFilters) return;
    this.isCallInitFilters = true;
    this.columns.forEach((column) => {
      this.filters.set(column.field, { value: null, show: false });
      this.filtersValue.set(column.field, null);
    });
  }
  onChangeFilter(field: string): void {
    this.filtersValue.set(field, this.filters.get(field)?.value);
    this.emitFilters();
  }
  setFiltersValues(filters: any): void {
    this.columns.forEach((column) => {
      const filter = this.filters.get(column.field);
      let value;
      if (column.type === 'dynamicOption') {
        const field = column.field.split('.')?.[0];
        value = field ? filters[field] : undefined;
      } else {
        value = filters[column.field];
      }
      this.filters.set(column.field, { ...filter, value, show: false });
      this.filtersValue.set(column.field, value);
    });
  }

  handlePageChange(event: PageEvent): void {
    this.elementService.scrollTo(
      this.dTableContainer.nativeElement,
      'auto',
      this.showTableCardMode ? -180 : -150
    );
    this.onPageChange.emit(event);
  }

  clearFilters(): void {
    this.columns.forEach((column) => this.clearFilterValue(column.field, true));
    this.emitFilters();
  }
  clearFilterValue(field: string, withoutEmit?: boolean): void {
    const filter = this.filters.get(field);
    this.filters.set(field, {
      ...filter,
      show: false,
      value: null,
    });
    this.filtersValue.set(field, null);
    if (!withoutEmit) this.emitFilters();
  }
  findFieldItem(
    fieldItems: DynamicTableFieldItem[] = [],
    value: any
  ): DynamicTableFieldItem {
    return fieldItems.find((s) => s.value === value) as DynamicTableFieldItem;
  }
  private emitFilters(): void {
    this.onFilter.emit(
      Object.fromEntries(this.filtersValue) as DTableFilterData<TData>
    );
  }

  private detectSmallTable() {
    this.showTableCardMode = this.layoutService.isMatchedBreakpoint(
      this.tableCardModeSize
    );
  }
  toggleFilter(field: string): void {
    const filter = this.filters.get(field)!;
    this.filters.set(field, {
      ...filter,
      show: !filter.show,
    });
  }
  getActions(actions: DynamicTableAction[], row: any): DynamicTableAction[] {
    return actions.map((action) => ({
      ...action,
      visible: !action?.hidden?.(row),
    }));
  }
  onChangeCheckbox(
    column: DynamicTableCol,
    checked: any[],
    isAll: boolean
  ): void {
    const isContainsAll = checked.includes(this.ALL);
    const filter = this.filters.get(column.field)!;
    let newValue: any[];
    column.fieldItems = column.fieldItems ?? [];
    if (isAll) {
      newValue = isContainsAll
        ? [...column.fieldItems.map((s) => s.value), this.ALL]
        : [];
    } else {
      if (isContainsAll && checked.length !== column?.fieldItems.length! + 1) {
        newValue = checked.filter((s) => s !== this.ALL);
      } else if (
        !isContainsAll &&
        checked.length === column?.fieldItems.length
      ) {
        newValue = [...checked, this.ALL];
      } else {
        newValue = checked;
      }
    }
    this.filters.set(column.field, { ...filter, value: newValue });
    const cleandNewValue = newValue.filter((v) => v !== this.ALL);
    this.filtersValue.set(
      column.field,
      cleandNewValue.length ? cleandNewValue : null
    );
    this.emitFilters();
  }
  get filterItemCount(): number {
    return this.columns.filter((column) => column.hasFilter).length;
  }
  get dataHasFiltered(): boolean {
    return !Array.from(this.filtersValue.values()).every(
      (value) => value === null || value === undefined
    );
  }
  get hasNoData(): boolean {
    return !this.loading && !this.dataSource?.length && !this.dataHasFiltered;
  }
  mapColumns(columns: DynamicTableCol[]): string[] {
    return columns.map((c) => c.field);
  }
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.detectSmallTable();
  }
}
