import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Order } from './order';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Access-Contorl-Allow-Origin': '*'
  })
}


@Injectable({
    providedIn: 'root',
})
export class OrderService {

  constructor(
    private http: HttpClient) {  }

  private orderurl= 'http://suse-order-processor.open-cloud.net/api/order';

  addOrder (order: Order): Observable<Order> {
    return this.http.post<Order>(this.orderurl, order, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
      
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.

      console.error('An error occurred:', error.error.message);

    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
