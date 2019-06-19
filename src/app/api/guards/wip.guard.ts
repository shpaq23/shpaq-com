import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {WipService} from '../services/wip.service';

@Injectable({
  providedIn: 'root'
})
export class WipGuard implements CanActivate {


  constructor(private router: Router,
              private wipService: WipService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.wipService.loggedUserTokenValue;
    if (currentUser) {
      return true;
    }
    this.router.navigate(['/wip/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
