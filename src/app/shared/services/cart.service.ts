import { BehaviorSubject } from 'rxjs';
import { environment as env } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalProductsInCart: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private http: HttpClient) { }

  addToCart(userId: number, products: any) {
    return this.http.post(`${env.apiRoot}/carts/add`,
      JSON.stringify({
        userId: +userId,
        products: products
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  getCartByUserId(userId: any) {
    return this.http.get(`${env.apiRoot}/carts/user/${userId}`)
  }
}
