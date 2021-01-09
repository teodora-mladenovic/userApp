import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  login(data: Object): Observable<HttpResponse<Object>> {
    return this.http.post(this.baseUrl + '/login', data, { observe: 'response' });
  }

  loginadmin(data: Object): Observable<HttpResponse<Object>> {
    return this.http.post(this.baseUrl + '/loginAdmin', data, { observe: 'response' });
  }

  register(data: Object): Observable<Object> {
    return this.http.post(this.baseUrl + '/register', data);
  }



  getAllUsers(): Observable<Object> {
    return this.http.get(this.baseUrl + '/');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth');
  }

}