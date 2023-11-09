import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiBaseUrl: string = 'https://ecommerce.routemisr.com';

  constructor(private _httpClient: HttpClient) {}

  getProduct(pageNum: number = 1): Observable<any> {
    return this._httpClient.get(`${this.apiBaseUrl}/api/v1/products?page=${pageNum}`);
  }

  getProductDetailsById(id: string | null): Observable<any> {
    return this._httpClient.get(`${this.apiBaseUrl}/api/v1/products/${id}`);
  }

  getCategories(): Observable<any> {
    return this._httpClient.get(`${this.apiBaseUrl}/api/v1/categories`);
  }

  getCategoryProductsById(categoryId: string | null): Observable<any> {
    return this._httpClient.get(`${this.apiBaseUrl}/api/v1/products?category[in]=${categoryId}`);
  }

  getBrands(): Observable<any> {
    return this._httpClient.get(`${this.apiBaseUrl}/api/v1/brands`);
  }

  getBrandProductsById(brandId: string | null): Observable<any> {
    return this._httpClient.get(`${this.apiBaseUrl}/api/v1/products?brand=${brandId}`);
  }
}
