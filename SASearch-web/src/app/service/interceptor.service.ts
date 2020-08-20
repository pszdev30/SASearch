import { TransferService } from './transfer.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

const serverError: string = 'Uh oh! It looks like the server is down. Try again later';
const action: string = 'Close';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) { }


  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(retry(2), catchError((error: HttpErrorResponse) => {
      console.log('this is server side error');
      let errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;

      if (error.status == 0)
        this.snackBar.open(serverError, action, {
          duration: 3000,
        });

      return throwError(errorMsg)
    }));
  }

}