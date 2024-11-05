import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users
);
export const selectUser = createSelector(
  selectUserState,
  (state) => state.selectedUser
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.isLoading
);

export const selectTotalUsers = createSelector(
  selectUserState,
  (state) => state.totalUsers
);
