import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {WipService} from '../services/wip.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor(private router: Router,
              private wipService: WipService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.wipService.loggedUserTokenValue;
    if (!currentUser) {
      return true;
    }
    this.router.navigate(['/wip']);
    return false;
  }
}
