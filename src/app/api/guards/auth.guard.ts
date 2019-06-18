import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Md5} from 'ts-md5/dist/md5';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private password = 'Alamakota1';
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  canActivate(): boolean {
    const currentUserToken = this.authenticationService.currentUserTokenValue;
    if (currentUserToken === Md5.hashStr(Md5.hashStr(this.password).toString())) {
      return true;
    } else {
      this.router.navigate(['/authorization']);
      return false;
    }
  }
}
