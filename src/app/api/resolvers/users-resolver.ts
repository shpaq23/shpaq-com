import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../../wip/interfaces/user';
import {WipService} from '../services/wip.service';

@Injectable({providedIn: 'root'})
export class UsersResolver implements Resolve<User[]> {
  constructor(private wipService: WipService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]> {
    return this.wipService.getUsers();
  }
}
