import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  apiBaseUrl: string = 'https://ecommerce.routemisr.com';
  wishListNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _httpClient: HttpClient) {}

  addToWishlist(id: string): Observable<any> {
    return this._httpClient.post(`${this.apiBaseUrl}/api/v1/wishlist`, { productId: id });
  }

  getLoggedUserWishlist(): Observable<any> {
    return this._httpClient.get(`${this.apiBaseUrl}/api/v1/wishlist`);
  }

  removeWishlistItem(id: string): Observable<any> {
    return this._httpClient.delete(`${this.apiBaseUrl}/api/v1/wishlist/${id}`);
  }
}
