import { Injectable } from '@angular/core';
import { Product } from "../../product";
import { CartItem } from "../types/cart-item";
import { STORAGE_KEYS } from "../../../shared/constants";

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[]

  constructor() {
    this.items = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS_IN_CART) || "[]")
  }

  public getProductQuantityInCart(): number {
    return this.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
  }

  public addProductToCart(product: Product): CartItem[] {
    const isProductAlreadyInCart = this.items.some(item => this.isProductInCart(product, item))

    this.items = isProductAlreadyInCart ? this.updateItemQuantity(product) : this.addItem(product)
    localStorage.setItem(STORAGE_KEYS.PRODUCTS_IN_CART, JSON.stringify(this.items))

    return this.items
  }

  private addItem(product: Product): CartItem[] {
    return [...this.items, { quantity: 1, product }]
  }

  private updateItemQuantity(product: Product): CartItem[] {
    return this.items.map(item => this.isProductInCart(product, item)
      ? { ...item, quantity: item.quantity + 1 }
      : item
    )
  }

  private isProductInCart(product: Product, item: CartItem): boolean {
    return product.id === item.product.id
  }
}
