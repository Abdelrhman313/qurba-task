import { environment as env } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: BehaviorSubject<any> = new BehaviorSubject(null)
  userToken: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private http: HttpClient) { }

  // User Login
  userLogin(username: any, password: any) {
    return this.http.post(`${env.apiRoot}/auth/login`,
      JSON.stringify({
        username: username,
        password: password,
      }),
      { headers: { 'Content-Type': 'application/json' }, }
    )
  }

  // Check If User Login
  isLogin() {
    return !!localStorage.getItem('token');
  }

}
