import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  private apiUrl = 'http://localhost:3000/producto/'; //ok
  private apiCart = 'http://localhost:3000/cart'; //ok
  private apiContents = 'http://localhost:3000/cart/contents';
  private apiRemove = 'http://localhost:3000/cart/remove';
  
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addToCart(productId: string, quantity: number): Observable<any> {
    const body = { quantity };
    return this.http.post<any>(`${this.apiCart}/add/${productId}`, body);
  }
  
  getCartContents(): Observable<any> {
    return this.http.get<any>(`${this.apiContents}`);
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiRemove}/${productId}`);
  }

}
