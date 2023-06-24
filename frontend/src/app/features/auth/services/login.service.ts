import { User } from '../types/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment.local';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private readonly httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  public login(user: User): Promise<any> {
    return this.httpClient.post(`${environment.loginUrl}`, user).toPromise()
  }
}
