import { User } from '../types/user.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AUTH_ROUTES } from '../auth.routes';

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

  public logout(): void {
    localStorage.removeItem('id')
  }

  public register(user: User): Promise<any> {
    return this.httpClient.post(`${environment.registerUrl}`, user).toPromise()
  }

  //verificar usuario
  public verifyUser(confirmationCode: string): Promise<any> {
    const url = `${AUTH_ROUTES.getAuth}/${confirmationCode}`
    return this.httpClient.get(url).toPromise()
  }

}
