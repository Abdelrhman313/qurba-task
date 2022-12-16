import { environment as env } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  searchTerm: BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private http: HttpClient) { }

  // get all Categories
  getAllCategories() {
    return this.http.get(`${env.apiRoot}/products/categories`)
  }

  // get all product
  getAllProducts(pagination: any) {
    return this.http.get(`${env.apiRoot}/products`, { params: pagination });
  }

  // Filter By Category
  getProductsByCategory(category: any, pagination: any) {
    return this.http.get(`${env.apiRoot}/products/category/${category}`, { params: pagination })
  }

  // Search On Products
  getProductsBySearch(searchTerm: any, pagination: any) {
    return this.http.get(`${env.apiRoot}/products/search?q=${searchTerm}`, { params: pagination })
  }
}
