import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = []
  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];

  constructor(private router: Router, protected _http: HttpClient) { }

  SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (user.login == curUser.login && user.password == curUser.password) {
        validUser = true;
        this.loggedUser = curUser.login;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }

  isAdmin(): Boolean {
    if (localStorage.getItem('userConnectedRole') != "ADMIN")
      return false;
    return true;
    ;
  }


  logout() {
    this.initLocastorage();
    this.router.navigate(['/login']);
  }




  // NEW METHOS COME FROM BACKEND
  login(p: User): Observable<any> {
    return this._http.post<any>(environment.authResource + "/login", p)

  }
  initLocastorage() {
    localStorage.removeItem('userConnectedRole')
    localStorage.removeItem('userConnectedID')
    localStorage.removeItem('userConnectedToken')

  }
  createLocalStorage(id: any, role: any, token: any) {
    localStorage.setItem('userConnectedRole', role)
    localStorage.setItem('userConnectedID', id)
    localStorage.setItem('userConnectedToken', token)

  }
}
