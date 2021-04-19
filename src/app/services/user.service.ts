import { Injectable } from '@angular/core';
import { Observable,throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'assets/mocks/users.json';

  constructor(private http: HttpClient) { }

  users$ = this.http.get<IUser[]>(this.usersUrl)
           .pipe(
            tap(data => console.log('Users', JSON.stringify(data))),
             catchError(this.handleError)
           );

  private handleError(err: any): Observable<never> {
   let errorMessage: string;
   if (err.error instanceof ErrorEvent) {
     errorMessage = `An error occurred: ${err.error.message}`;
   } else {
     errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
   }
   console.error(err);
   return throwError(errorMessage);
  }
}
