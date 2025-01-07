import {HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isRelativeUrl = !req.url.startsWith('http');
    console.log(req.url);
    const apiReq = isRelativeUrl
      ? req.clone({ url: `${environment.apiUrl}${req.url}` })
      : req;
    console.log(apiReq);

    return next.handle(apiReq);
  }
}
