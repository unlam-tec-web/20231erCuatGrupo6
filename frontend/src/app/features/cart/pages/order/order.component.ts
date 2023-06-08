import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../product/types/product.interface';
import { CartItem } from '../../types/cart-item';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],

})
export class OrderComponent implements OnInit {
  
  cartItems?: CartItem[];
  total: number = 0;
  
  constructor(private cartService: CartService){

  }

  ngOnInit(): void {
    this.cartService.cartQuantityProduct$.subscribe( items => {
      this.cartItems=items;
      this.total = this.cartService.calculateTotalCost(items);
    });

  }

  remove(item:Product){
   this.cartService.removeProduct(item);
  }

  add(item:Product){
    this.cartService.addProduct(item);
  }

  removeAll(item:Product){
    this.cartService.removeTotalProduct(item);
  }

}
