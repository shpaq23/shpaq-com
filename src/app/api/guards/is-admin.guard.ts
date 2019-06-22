import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {WipService} from '../services/wip.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private router: Router,
              private wipService: WipService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.wipService.getUser()
      .pipe(
        map(value => {
          if (value.data.isAdmin) {
            return true;
          }
          this.router.navigate(['/wip']);
          return false;
        })
      );
  }
}
