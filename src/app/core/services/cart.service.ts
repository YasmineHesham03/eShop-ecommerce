import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  apiBaseUrl: string = 'https://ecommerce.routemisr.com';


  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _httpClient: HttpClient) {}

  addToCart(id: string): Observable<any> {
    return this._httpClient.post(`${this.apiBaseUrl}/api/v1/cart`, { productId: id });
  }

  getLoggedUserCart(): Observable<any> {
    return this._httpClient.get(`${this.apiBaseUrl}/api/v1/cart`);
  }

  removeCartItem(id: string): Observable<any> {
    return this._httpClient.delete(`${this.apiBaseUrl}/api/v1/cart/${id}`);
  }

  updateProductCount(count: number, id: string): Observable<any> {
    return this._httpClient.put(`${this.apiBaseUrl}/api/v1/cart/${id}`, { count: count });
  }

  clearAllCartItems(): Observable<any> {
    return this._httpClient.delete(`${this.apiBaseUrl}/api/v1/cart`);
  }

  checkOut(cartId: string | null, shippingInfo: object): Observable<any> {
    return this._httpClient.post(
      `${this.apiBaseUrl}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: shippingInfo,
      }
    );
  }
}
