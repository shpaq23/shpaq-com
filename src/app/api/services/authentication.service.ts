import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserToken: BehaviorSubject<string>;

  constructor() {
    this.currentUserToken = new BehaviorSubject<string>(localStorage.getItem('userToken'));
  }

  public get currentUserTokenValue(): string {
    return this.currentUserToken.value;
  }

  login(password: string) {
    localStorage.setItem('userToken', Md5.hashStr(Md5.hashStr(password).toString()).toString());
  }
}
