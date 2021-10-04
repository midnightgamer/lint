import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.indexOf(environment.auth_url) == -1 && httpRequest.url.indexOf(environment.keycloak.url) == -1) {
      let Authorization = httpRequest.headers.get('Authorization');
      if (Authorization) {
        httpRequest = httpRequest.clone({ headers: httpRequest.headers.delete('Authorization', Authorization) });
      }
    }
    return next.handle(httpRequest);
  }
}