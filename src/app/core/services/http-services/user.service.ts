import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { map, Observable } from 'rxjs';
import { PagedResponseModel, ResponseModel } from '../../models/common.model';
import {
  UserDetailsModel,
  UserModel,
  UserQueryParamsModel,
} from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly getUsersUrl = '/users';
  private readonly getUserByIdUrl = '/users/{id}';

  constructor(private readonly baseService: BaseService) {}

  getUsers(
    queryParams: UserQueryParamsModel
  ): Observable<PagedResponseModel<UserModel[]>> {
    const params =
      this.baseService.prepareHttpParams<UserQueryParamsModel>(queryParams);
    return this.baseService
      .getHttp<PagedResponseModel<UserModel[]>>(
        this.baseService.configService.baseUrl + this.getUsersUrl,
        params
      )
      .pipe(
        map((data) => {
          console.log('data', data);

          return data;
        })
      );
  }
  getUserDetails(id: number): Observable<ResponseModel<UserDetailsModel>> {
    return this.baseService.getHttp<ResponseModel<UserDetailsModel>>(
      this.baseService.configService.baseUrl +
        this.getUserByIdUrl.replace('{id}', id.toString())
    );
  }
}
