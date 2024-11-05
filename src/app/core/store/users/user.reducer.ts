import { createReducer, on } from '@ngrx/store';
import {
  loadUsersSuccess,
  loadUserDetailsSuccess,
  loadUsersFailure,
  loadUserDetailsFailure,
} from './user.actions';
import { UserModel } from '../../models/user.model';

export interface UserState {
  users: UserModel[];
  selectedUser: UserModel | null;
  isLoading: boolean;
  totalUsers: number;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  isLoading: false,
  totalUsers: 0,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsersSuccess, (state, { users, total }) => {
    return {
      ...state,
      users: users,
      totalUsers: total,
      isLoading: false,
    };
  }),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(loadUserDetailsSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user,
    isLoading: false,
  })),
  on(loadUserDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
