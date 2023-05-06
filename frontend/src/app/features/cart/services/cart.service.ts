import { Injectable } from '@angular/core';
import { Product } from "../../product";
import { CartItem } from "../types/cart-item";
import { STORAGE_KEYS } from "../../../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[]

  constructor() {
    this.items = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS_IN_CART) || "[]")
  }

  public getProductQuantityInCart(): number {
    return this.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
  }

  public addProductToCart(product: Product) {
    const isProductAlreadyInCart = this.items.some(item => item.product.id === product.id)

    this.items = isProductAlreadyInCart ? this.updateItemQuantity(product.id) : this.addItem(product)

    return this.items
  }

  private addItem(product: Product): CartItem[] {
    return [...this.items, { quantity: 1, product }]
  }

  private updateItemQuantity(productId: number): CartItem[] {
    return this.items.map(item => item.product.id === productId
      ? { ...item, quantity: item.quantity + 1 }
      : item
    )
  }
}
