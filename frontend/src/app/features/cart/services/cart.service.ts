import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, catchError, tap, Observable } from 'rxjs';

import { STORAGE_KEYS } from "../../../shared/constants";
import { environment } from "../../../../environments/environment.local";
import { Product } from "../../product";
import { CartItem } from '../types/cart-item';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly httpClient: HttpClient
  private items: CartItem[]
  
  private cartQuantityProductSubject : BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  cartQuantityProduct$ = this.cartQuantityProductSubject.asObservable();


  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
    this.items = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRODUCTS_IN_CART) || "[]")
    this.cartQuantityProductSubject.next(this.items);
  }

  public getProductQuantityInCart(items: CartItem[]): number {
    return items.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0)
  }

  public calculateTotalCost (items: CartItem[]): number {
    return items.reduce((total, item) => total + item.product.price * item.quantity , 0)
  }

  public addProduct(product: Product, quantity: number=1): void {
    const isProductAlreadyInCart = this.items.some(item => this.isProductInCart(product, item))

    this.items = isProductAlreadyInCart ? this.addItemQuantity(product,quantity) : this.addItem(product,quantity)

    this.cartQuantityProductSubject.next(this.items);

    localStorage.setItem(STORAGE_KEYS.PRODUCTS_IN_CART, JSON.stringify(this.items))

  }

  public removeProduct(product: Product): CartItem[] {
    this.items = this.removeItemQuantity(product)  
    
    this.cartQuantityProductSubject.next(this.items);
     
    localStorage.setItem(STORAGE_KEYS.PRODUCTS_IN_CART, JSON.stringify(this.items))

    return this.items;
  }

  public removeTotalProduct(product: Product): CartItem[]{

    this.items = this.filter(product);
    
    this.cartQuantityProductSubject.next(this.items);

    localStorage.setItem(STORAGE_KEYS.PRODUCTS_IN_CART, JSON.stringify(this.items))

    return this.items;
  }


  public checkout(): Promise<any> {

    const requestBody = {
    id: JSON.parse(localStorage.getItem('id') || ''),
    items: this.items
    };
    
   return this.httpClient.post(environment.checkoutUrl, requestBody).toPromise();

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


  //TODO Mejorar codigo para que no se borre el producto cuando resto a 0, sino con un boton eliminar o dar un aviso
  
  private removeItemQuantity(product: Product): CartItem[] {
    return this.items.map(item => this.isProductInCart(product, item)
    ? { ...item, quantity: item.quantity - 1 }
    : item
  )
    .filter(item => item.quantity >= 1)
   
  }

  private filter(prodcut: Product): CartItem[]{
    return this.items.filter(item => item.product.id != prodcut.id);
  }

  private isProductInCart(product: Product, item: CartItem): boolean {
    return product.id === item.product.id
  }

  public clear(): void {
    this.items = []

    this.cartQuantityProductSubject.next(this.items);

    localStorage.setItem(STORAGE_KEYS.PRODUCTS_IN_CART, JSON.stringify(this.items));

  }
}
