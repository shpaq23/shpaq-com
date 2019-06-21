import { Injectable } from '@angular/core';
import {environment} from '../../../../api/url.constants';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../wip/interfaces/user';
import {HttpClient} from '@angular/common/http';
import {LoginCredentials} from '../../wip/interfaces/login-credentials';
import {Token} from '../../wip/interfaces/token';
import {map} from 'rxjs/operators';
import {ResetPassword} from '../../wip/interfaces/reset-password';
import {RegisterForm} from '../../wip/interfaces/register-form';

@Injectable({
  providedIn: 'root'
})
export class WipService {

  private url = environment.apiUrl;
  private loggedUser: BehaviorSubject<User>;
  private loggedUserToken: BehaviorSubject<Token>;
  constructor(private http: HttpClient) {
    this.loggedUserToken = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('wipUser')));
  }

  login(loginCredentials: LoginCredentials) {
    return this.http.post<{code: number, data: Token, message: string}>(this.url + '/user/login', loginCredentials)
      .pipe(map(json => {
        if (json.data && json.data.access_token) {
          localStorage.setItem('wipUser', JSON.stringify(json.data));
          this.loggedUserToken.next(json.data);
        }
        return null;
      }));
  }
  get loggedUserTokenValue(): Token {
    return this.loggedUserToken.value;
  }
  set currenLoggedUser(user: BehaviorSubject<User>) {
    this.loggedUser = user;
  }
  get currentLoggedUser(): BehaviorSubject<User> {
    return this.loggedUser;
  }
  updateCurrentCharacter(user: User) {
    this.loggedUser.next(user);
  }
  logout() {
    localStorage.removeItem('wipUser');
    this.loggedUserToken.next(null);
  }
  register(registerForm: RegisterForm) {
    return this.http.post(this.url + '/user/register', registerForm);
  }
  getUser() {
    return this.http.get<User>(this.url + '/user');
  }
  getUsers() {
    return this.http.get<User[]>(this.url + '/users');
  }
  checkEmailAvailability(email: string) {
    return this.http.get(this.url + '/user/email/' + email);
  }
  resetPasswordStep1(email: string) {
    return this.http.get(this.url + '/user/reset/' + email);
  }
  resetPasswordStep2(resetPasswordForm: ResetPassword) {
    return this.http.post(this.url + '/user/reset', resetPasswordForm);
  }
  activateAccount(email: string) {
    return this.http.get(this.url + '/user/reactivate/' + email);
  }
}
