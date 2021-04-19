import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IUser } from '../models/IUser';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  errorMessage:string = '';

  constructor(private http:HttpClient, private userService:UserService) { }

  authenticateUser(email:string, password:string):Observable<IUser>{

    return this.userService.users$.pipe(
      map(users => users.find(user => user.email === email && user.password === password)),
      catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
    );

  }

  isAuthenticated():boolean{
    let user = this.getAuthenticatedUser();
    return user !== null;
  }

  getAuthenticatedUser():IUser{
    let userStorageItem = localStorage.getItem("user");

    if(userStorageItem !== null && userStorageItem !== undefined){

      let user:IUser = JSON.parse(userStorageItem);

      if(user.id > 0)
        return user;
    }
    return null;
  }
}
