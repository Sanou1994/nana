import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/internal/operators";
import { Observable } from 'rxjs';
import { AuthService } from "../auth/auth.service";


@Injectable()
export class HttpinterceptorService implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('userConnectedToken')

    if (token != null) {
      // If we have a token, we set it to the header
      request = request.clone({
        setHeaders: {

          'Authorization': `Bearer ${token}`
        }
      });
    }


    return next.handle(request).pipe(tap(() => { },
      (err: any) => {

        if (err instanceof HttpErrorResponse) {

          switch (err.status) {
            case 302: {

              break;
            }
            case 401: {
              this.authService.initLocastorage();
              this.router.navigateByUrl('/');

              break;
            }
            case 400: {

              break;
            }
            case 404: {

              break;
            }
            case 500: {

              this.router.navigateByUrl('/');

              break;
            }
            default: {
              this.router.navigateByUrl('/');

              break;
            }
          }
        }
      }));
  }
}
