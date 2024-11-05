import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadUsers,
  loadUsersSuccess,
  loadUserDetails,
  loadUserDetailsSuccess,
} from './user.actions';
import { switchMap, map } from 'rxjs/operators';
import { UserService } from '../../services/http-services/user.service';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  constructor(private readonly userService: UserService) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(({ page }) =>
        this.userService
          .getUsers({ page })
          .pipe(
            map((response) =>
              loadUsersSuccess({ users: response.data, total: response.total })
            )
          )
      )
    )
  );

  loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserDetails),
      switchMap(({ id }) =>
        this.userService
          .getUserDetails(id)
          .pipe(
            map((response) => loadUserDetailsSuccess({ user: response.data }))
          )
      )
    )
  );
}
