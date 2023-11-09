import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: any = '';

  constructor(private _httpClient: HttpClient) {}

  apiBaseUrl: string = 'https://ecommerce.routemisr.com';

  register(userData: object): Observable<any> {
    return this._httpClient.post(`${this.apiBaseUrl}/api/v1/auth/signup`, userData);
  }

  login(userData: object): Observable<any> {
    return this._httpClient.post(`${this.apiBaseUrl}/api/v1/auth/signin`, userData);
  }

  decodeToken(): void {
    const encodeToken = localStorage.getItem('userToken');
    if (encodeToken) {
      const decode = jwtDecode(encodeToken);
      this.token = decode;
    }
  }
}
