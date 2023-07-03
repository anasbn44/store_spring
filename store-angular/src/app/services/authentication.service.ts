import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {UUID} from "angular2-uuid";
import {Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  users : User[] = [];
  authenticatedUser : User | undefined;
  constructor() {
    this.users.push({userId : UUID.UUID(),username : "anas",password : "1234", roles : ["USER", "ADMIN"]});
    this.users.push({userId : UUID.UUID(),username : "user1",password : "1234", roles : ["USER"]});
    this.users.push({userId : UUID.UUID(),username : "user2",password : "1234", roles : ["USER"]});
  }

  public login(username : string, password : string) : Observable<User>{
    let logged = this.users.find(u=> u.username == username);
    if (!logged)
      return throwError(()=> new Error("User not found"));
    if (logged.password != password)
      return throwError(()=> new Error("wrong password"));
    return of(logged);
  }

  public authenticateUser(user : User) : Observable<boolean>{
    this.authenticatedUser = user;
    localStorage.setItem("authUser", JSON.stringify({username : user.username, roles : user.roles, jwt : "JWT_TOKEN"}));
    return of(true);
  }

  public hasRole(role : string) : boolean{
    return this.authenticatedUser!.roles.includes(role);
  }

  public isAuthenticated() {
    return this.authenticatedUser != undefined;
  }

  public logout() :Observable<boolean>{
    this.authenticatedUser = undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
}
