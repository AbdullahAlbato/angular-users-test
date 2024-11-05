import { QueryParamsHandling } from '@angular/router';
export interface PaginationModel {
  page: number;
  pageSize: number;
}
export interface BaseQueryParamModel {
  page: number;
}
export interface PagedResponseModel<T> {
  data: T;
  page: number;
  per_page: number;
  total: number;
  total_page: number;
}
export interface ResponseModel<T> {
  data: T;
}
export interface MenuItem {
  label?: string;
  icon?: string;
  command?(...args: any): void;
  url?: string;
  items?: MenuItem[];
  expanded?: boolean;
  disabled?: boolean;
  visible?: boolean;
  target?: string;
  escape?: boolean;
  routerLinkActiveOptions?: any;
  separator?: boolean;
  badge?: string;
  tooltip?: string;
  tooltipPosition?: string;
  badgeStyleClass?: string;
  style?: {
    [key: string]: any;
  } | null;
  styleClass?: string;
  title?: string;
  id?: string;
  automationId?: any;
  tabindex?: string;
  routerLink?: any;

  queryParams?: {
    [k: string]: any;
  };
  fragment?: string;
  queryParamsHandling?: QueryParamsHandling;
  preserveFragment?: boolean;
  skipLocationChange?: boolean;
  replaceUrl?: boolean;

  iconStyle?: {
    [key: string]: any;
  } | null;
  iconClass?: string;
}
type ColumnType =
  | 'text'
  | 'number'
  | 'status'
  | 'date'
  | 'dateTime'
  | 'option'
  | 'dynamicOption'
  | 'price'
  | 'image';
type FilterType = 'radio' | 'checkbox' | 'calendar';
export interface DynamicTableCol {
  field: string; // value to bind the column to its values
  header: string | null; // title of column to be showed.
  type: ColumnType; // type of content inside the column.
  filterType?: FilterType;
  sortable?: boolean; // to make a column sortable.
  hasFilter?: boolean; // to set if a column has a filter.
  style?: object;
  headerStyle?: object;
  class?: string;
  isHidden?: boolean;
  fieldItems?: DynamicTableFieldItem[];
  expandableRow?: boolean;
  cardCol: Omit<DynamicTableCol, 'cardCol'> & {
    order: number;
  };
}
export interface Status {
  label: string;
  value: any;
  varient?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'tone';
}

export type DynamicTableFieldItem = Status;
export interface DynamicTableAction extends MenuItem {
  onCommand: (...args: any[]) => void;
  hidden?: (...args: any[]) => boolean;
}
export interface DynamicTableActionLoader {
  id: number;
  key: string;
  value: boolean;
}
export interface DynamicTableFilter {
  value: any;
  show: boolean;
}
export type DTableFilterData<T> = Record<keyof Required<T>, any>;
