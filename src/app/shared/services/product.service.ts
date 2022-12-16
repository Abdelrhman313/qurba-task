import { environment as env } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  userData: BehaviorSubject<any> = new BehaviorSubject(null)
  userToken: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get(`${env.apiRoot}/products/categories`)
  }

  // get all product
  getAllProducts(pagination: any) {
    return this.http.get(`${env.apiRoot}/products`, { params: pagination });
  }
}
