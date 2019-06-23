import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {WipService} from '../services/wip.service';
import {ServerResponse} from '../../wip/interfaces/server-response';

@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<ServerResponse> {
  constructor(private wipService: WipService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServerResponse> {
    return this.wipService.getUser();
  }
}
