import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenBindingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({
      headers : request.headers.append(
        'Authorization',
        `Bearer ${localStorage.getItem('Token')}`
      )
    })
    
    console.log(modifiedRequest);
    
    return next.handle(modifiedRequest);
  }
}
