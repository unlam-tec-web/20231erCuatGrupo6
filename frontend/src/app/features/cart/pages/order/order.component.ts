import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../../product/types/product.interface';
import { Order } from '../../../cart/types/order.interface';
import { CartItem } from '../../types/cart-item'; 
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],

})
export class OrderComponent implements OnInit {
  
  cartItems?: CartItem[];
  total: number = 0;
  order:Order = {
    id: 0,
    total: 0,
    user_id: ''
  } 

  constructor(private cartService: CartService){

  }
  
  ngOnInit(): void {
    this.cartService.cartQuantityProduct$.subscribe( items => {
      this.cartItems=items;
      this.total = this.cartService.calculateTotalCost(items);
          
    });

  }

  emitir():void{
    console.log("se deberia guardar la orden para tal usuario");
    this.cartService.saveOrder(this.order);
    console.log(this.order);
  }
  saveOrder(order:Order){
    this.cartService.saveOrder(order);
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
