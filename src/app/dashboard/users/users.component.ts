/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, Subscription } from 'rxjs';
import { UserModel, UserQueryParamsModel } from '../../core/models/user.model';
import {
  DTableFilterData,
  DynamicTableCol,
  DynamicTableFieldItem,
} from '../../core/models/common.model';

import { Store } from '@ngrx/store';
import { loadUsers } from '../../core/store/users/user.actions';
import { PageEvent } from '@angular/material/paginator';
import {
  selectUserLoading,
  selectUsers,
  selectTotalUsers,
} from '../../core/store/users/user.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
  users$: Observable<UserModel[]>;
  loading$: Observable<boolean>;
  total$: Observable<number>;
  pagination: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 12,
  };
  filters!: UserQueryParamsModel;

  columns: DynamicTableCol[] = [];
  status: DynamicTableFieldItem[] = [];
  private queryParamsSubscription: Subscription = new Subscription();
  private currentUserSubscription: Subscription = new Subscription();
  constructor(private router: Router, private store: Store) {
    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectUserLoading);
    this.total$ = this.store.select(selectTotalUsers).pipe(
      map((total) => {
        this.pagination.length = total;
        return total;
      })
    );
  }
  ngOnInit(): void {
    this.initTable();
    this.getUsers();
  }

  getUsers(updateState: boolean = false): void {
    this.store.dispatch(loadUsers({ page: 1 }));
  }
  handlePageChange(event: PageEvent): void {
    this.store.dispatch(loadUsers({ page: event.pageIndex + 1 }));
  }

  initTable(): void {
    this.columns = [
      {
        field: 'id',
        header: 'Id',
        type: 'text',
        cardCol: {
          field: 'id',
          header: null,
          type: 'text',
          order: 1,
        },
      },
      {
        field: 'avatar',
        header: 'Avatar',
        type: 'image',
        cardCol: {
          field: 'avatar',
          header: null,
          type: 'image',
          order: 2,
        },
      },
      {
        field: 'email',
        header: 'Email',
        type: 'text',
        cardCol: {
          field: 'email',
          header: 'Last Name',
          type: 'text',
          order: 3,
        },
      },
      {
        field: 'first_name',
        header: 'First Name',
        type: 'text',
        cardCol: {
          field: 'first_name',
          header: 'First Name',
          type: 'text',
          order: 3,
        },
      },
      {
        field: 'last_name',
        header: 'Last Name',
        type: 'text',
        cardCol: {
          field: 'last_name',
          header: 'Last Name',
          type: 'text',
          order: 4,
        },
      },
    ];
  }
  handleUserFilters(filters: DTableFilterData<UserModel>): void {
    this.pagination.pageIndex = 1;
    this.getUsers(true);
  }
  navigateToUserDetails(data: UserModel): void {
    this.router.navigate(['/dashboard/user-details', data.id]);
  }
  getSelectedFilters(filters: UserQueryParamsModel) {
    return {};
  }
  ngOnDestroy(): void {
    if (this.queryParamsSubscription)
      this.queryParamsSubscription.unsubscribe();
    if (this.currentUserSubscription)
      this.currentUserSubscription.unsubscribe();
  }
}
