import { Injectable } from '@angular/core';
import { Product } from "../types/product.interface";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PRODUCT_ROUTES } from "../product.routes";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  public findAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(PRODUCT_ROUTES.getProducts)
  }

  public findProductsBySearchTerm(searchTerm: string): Observable<Product[]> {
    const url = `${PRODUCT_ROUTES.getProducts}/?searchTerm=${searchTerm}`

    return this.httpClient.get<Product[]>(url)
  }

  public findProductsById(id: number): Observable<Product> {
    const url = `${PRODUCT_ROUTES.getProducts}/${id}`

    return this.httpClient.get<Product>(url)
  }
}
