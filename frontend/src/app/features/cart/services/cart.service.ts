import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, tap } from "rxjs";

import { STORAGE_KEYS } from "../../../shared/constants";
import { environment } from "../../../../environments/environment.local";
import { Product } from "../../product";
import { CartItem } from "../types/cart-item";

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly httpClient: HttpClient
  private items: CartItem[]

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
    this.items = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS_IN_CART) || "[]")
  }

  public getProductQuantityInCart(): number {
    return this.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
  }

  public calculateTotalCost (): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity , 0)
  }

  public addProduct(product: Product): CartItem[] {
    const isProductAlreadyInCart = this.items.some(item => this.isProductInCart(product, item))

    this.items = isProductAlreadyInCart ? this.addItemQuantity(product) : this.addItem(product)
    localStorage.setItem(STORAGE_KEYS.PRODUCTS_IN_CART, JSON.stringify(this.items))

    return this.items
  }

  public removeProduct(product: Product): CartItem[] {
    this.items = this.removeItemQuantity(product)
    localStorage.setItem(STORAGE_KEYS.PRODUCTS_IN_CART, JSON.stringify(this.items))

    return this.items;
  }

  public checkout(): void {
    this.httpClient.post(environment.checkoutUrl, { items: this.items })
      .pipe(
        catchError(() => this.items), // Falta notificar al usuario en caso de error.
        tap( () => this.clear())
      )
      .subscribe()
  }

  private addItem(product: Product): CartItem[] {
    return [...this.items, { quantity: 1, product }]
  }

  private addItemQuantity(product: Product): CartItem[] {
    return this.items.map(item => this.isProductInCart(product, item)
      ? { ...item, quantity: item.quantity + 1 }
      : item
    )
  }

  private removeItemQuantity(product: Product): CartItem[] {
    return this.items.map(item => this.isProductInCart(product, item)
      ? { ...item, quantity: item.quantity - 1 }
      : item
    )
      .filter(item => item.quantity === 0)
  }

  private isProductInCart(product: Product, item: CartItem): boolean {
    return product.id === item.product.id
  }

  private clear(): void {
    this.items = []
    localStorage.setItem(STORAGE_KEYS.PRODUCTS_IN_CART, JSON.stringify(this.items))
  }
}
