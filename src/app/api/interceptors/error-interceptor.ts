import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {WipService} from '../services/wip.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private wipService: WipService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err.status === 500) {
        this.wipService.logout();
        location.reload(true);
      }
      const error = err.error.data;
      return throwError(error);
    }));
  }
}




