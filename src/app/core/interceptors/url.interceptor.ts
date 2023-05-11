import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { Injectable, Provider } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const includeApiTag = req.url.includes('@api');

    if (includeApiTag) {
      let requestUrl = req.url;
      const api_url = environment.apiUrl;
      requestUrl = requestUrl.replace('@api', api_url);
      const intercepted = req.clone({ url: requestUrl });

      return next.handle(intercepted);
    }

    return next.handle(req.clone({ url: req.url }));
  }
}

export const apiUrlInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: UrlInterceptor,
  multi: true,
};
