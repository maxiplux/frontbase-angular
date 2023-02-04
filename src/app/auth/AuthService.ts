import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Profile} from "../models/profile";
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userActive: boolean = false;
  private _user: Profile = new Profile();
  private _token: string = '';
  private urlEndpoint: string =  `${environment.baseUrl}/oauth/token`;

  constructor(private http: HttpClient) { }


  isAuthenticated(): boolean {
    let payload = this.getDataFromToken(this.token);

    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  saveUser(accessToken: string): void {

    let payload = this.getDataFromToken(accessToken);
    this._user = new Profile();
    this._user.nombre = payload.nombre;
    this._user.apellido = payload.apellido;
    this._user.email = payload.email;
    this._user.username = payload.user_name;
    this._user.roles = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }


  hasRole(role: string): boolean {
    if (this._user.roles.includes(role)) {
      return true;
    }
    return false;
  }
  logout(): void {
    this._token = '';
    this._user = new Profile();
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('_user');
  }

  login(username: string, password: string): Observable<any> {


    const credenciales = btoa(`${environment.oauth2.clientId}` + ':' + `${environment.oauth2.secretId}`);

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', username);
    params.set('password', password);

    return this.http.post<any>(this.urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  public get user(): Profile {
    if (this._user != null)
    {
      return this._user;
    }
    if (this._user == null && sessionStorage.getItem('user') != null)
    {
      // @ts-ignore
      this._user = sessionStorage.getItem('user');
      return this._user;
    }
    return new Profile();

  }
  public get token(): string {

    if (this._token != '')
    {
      return this._token;
    }


    // @ts-ignore
    if (sessionStorage.getItem('token') != null)
    {
      // @ts-ignore
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return '';
  }
  getDataFromToken(accessToken: string): any
  {

    if (accessToken != '' && accessToken.length > 0)
    {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }

    return {};
  }


}
