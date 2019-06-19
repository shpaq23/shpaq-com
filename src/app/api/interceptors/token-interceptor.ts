import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WipService} from '../services/wip.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private wipService: WipService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUserToken = this.wipService.loggedUserTokenValue;
    if (currentUserToken && currentUserToken.access_token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserToken.access_token}`
        }
      });
    }
    return next.handle(req);
  }

}
