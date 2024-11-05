/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UserDetailsModel, UserModel } from '../../core/models/user.model';
import { UserService } from '../../core/services/http-services/user.service';
import { Store } from '@ngrx/store';
import {
  selectUserLoading,
  selectUser,
  selectUserState,
} from '../../core/store/users/user.selectors';
import { loadUserDetails } from '../../core/store/users/user.actions';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserDetailsComponent implements OnInit {
  user$: Observable<UserModel | null>;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.user$ = this.store.select(selectUser);
    this.loading$ = this.store.select(selectUserLoading);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = Number(params.get('userId'));
      if (userId) {
        this.store.dispatch(loadUserDetails({ id: userId }));
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}
