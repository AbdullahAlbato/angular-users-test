import { BaseQueryParamModel } from './common.model';

export interface UserModel {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  email: string;
}
export interface UserDetailsModel extends UserModel {}
export interface UserQueryParamsModel extends BaseQueryParamModel {}
