import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, tap } from "rxjs";

import { STORAGE_KEYS } from "../../../shared/constants";
import { environment } from "../../../../environments/environment.local";
import { Product } from "../../product";
import { CartItem } from '../types/cart-item';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly httpClient: HttpClient
  private items: CartItem[]
  
  private cartItemsCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartItemsCount$ = this.cartItemsCountSubject.asObservable();
  
  private cartQuantityProductSubject : BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  cartQuantityProduct$ = this.cartQuantityProductSubject.asObservable();


  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
    this.items = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS_IN_CART) || "[]")
    this.cartQuantityProductSubject.next(this.items);
  }

  loadCartItems(): void {
    const storedCartItems = localStorage.getItem(STORAGE_KEYS.PRODUCTS_IN_CART);
    if (storedCartItems) {
      this.items = JSON.parse(storedCartItems);
      this.updateCartItemsCount();
    }
  }

  public getProductQuantityInCart(): number {
    return this.items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
  }

  
  public calculateTotalCost (): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity , 0)
  }

  public addProduct(product: Product, quantity: number=1): void {
    const isProductAlreadyInCart = this.items.some(item => this.isProductInCart(product, item))

    this.items = isProductAlreadyInCart ? this.addItemQuantity(product,quantity) : this.addItem(product,quantity)

    localStorage.setItem(STORAGE_KEYS.PRODUCTS_IN_CART, JSON.stringify(this.items))

    this.updateCartItemsCount();

    this.cartQuantityProductSubject.next(this.items);

  }

  public removeProduct(product: Product): CartItem[] {
    this.items = this.removeItemQuantity(product)  
    
    this.cartQuantityProductSubject.next(this.items);

    this.updateCartItemsCount();
     
    localStorage.setItem(STORAGE_KEYS.PRODUCTS_IN_CART, JSON.stringify(this.items))

    return this.items;
  }

  private updateCartItemsCount(): void {
    const count = this.getProductQuantityInCart();
    this.cartItemsCountSubject.next(count);
  }

  public checkout(): void {
    this.httpClient.post(environment.checkoutUrl, { items: this.items })
      .pipe(
        catchError(() => this.items), // Falta notificar al usuario en caso de error.
        tap( () => this.clear())
      )
      .subscribe()
  }

  private addItem(product: Product, quantity: number): CartItem[] {
    return [...this.items, { quantity , product }]
  }

  private addItemQuantity(product: Product, quantity: number): CartItem[] {
    return this.items.map(item => this.isProductInCart(product, item)
      ? { ...item, quantity: item.quantity + quantity }
      : item
    )
  }


  //TODO Mejorar codigo para que no se borre el producto cuando resto a 0, sino con un boton eliminar
  private removeItemQuantity(product: Product): CartItem[] {
  
    return this.items.map(item => {
      if (this.isProductInCart(product, item) ) {
        if(item.quantity <= 1 ){
          return item;
          }
      return {
          ...item,
          quantity: item.quantity - 1
        };
      } else {
        return item;
      }
    });
   
  }

  private isProductInCart(product: Product, item: CartItem): boolean {
    return product.id === item.product.id
  }

  private clear(): void {
    this.items = []
    localStorage.setItem(STORAGE_KEYS.PRODUCTS_IN_CART, JSON.stringify(this.items))
  }
}
