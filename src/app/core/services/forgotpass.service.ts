import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotpassService {
  apiBaseUrl: string = 'https://ecommerce.routemisr.com';

  constructor(private _httpClient: HttpClient) {}

  forgetPassword(userEmail: object): Observable<any> {
    return this._httpClient.post(`${this.apiBaseUrl}/api/v1/auth/forgotPasswords`, userEmail);
  }

  verifyResetCode(resetCode: object): Observable<any> {
    return this._httpClient.post(`${this.apiBaseUrl}/api/v1/auth/verifyResetCode`, resetCode);
  }

  resetPassword(resetPasswordForm: object): Observable<any> {
    return this._httpClient.put(`${this.apiBaseUrl}/api/v1/auth/resetPassword`, resetPasswordForm);
  }
}
