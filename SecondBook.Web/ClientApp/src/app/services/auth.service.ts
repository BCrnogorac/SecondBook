import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginBM } from '../models/BM/loginBM.model';
import { RegisterBM } from '../models/BM/registerBM.model';
import { TokenDto } from '../models/DTO/tokenDto.model';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { UserModel } from '../models/user.model';
import { UserDto } from '../models/DTO/userDto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serviceBaseUrl = '';
  public user = new BehaviorSubject<UserDto | null>(null);

  constructor(
    public http: HttpClient,
    @Inject('API_BASE_URL') public baseUrl: string,
    public router: Router
  ) {
    this.serviceBaseUrl = `${this.baseUrl}/api/user`;
  }

  login(loginModel: LoginBM): Observable<TokenDto> {
    return this.http.post<TokenDto>(`${this.serviceBaseUrl}/login`, loginModel);
  }

  register(registerModel: RegisterBM): Observable<TokenDto> {
    return this.http.post<TokenDto>(
      `${this.serviceBaseUrl}/register`,
      registerModel
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.user.next(null);
    console.log('Local storage cleared.');
  }

  autoLogin() {
    if (this.user.value == null) {
      if (localStorage.getItem('tokenInfo') != null) {
        let currentUser: UserDto = JSON.parse(
          localStorage.getItem('tokenInfo')
        );
        this.user.next(currentUser);
      }
    }
  }

  storeTokenToLocalStorage(token: TokenDto): void {
    this.user.next(token.user);
    localStorage.setItem('tokenInfo', JSON.stringify(token.user));
    console.log('Stored');
  }

  getUserProperty(property?: string): string {
    if (this.user.value != null) {
      return this.user.value[`${property}`];
    }
    return null;
  }
}
