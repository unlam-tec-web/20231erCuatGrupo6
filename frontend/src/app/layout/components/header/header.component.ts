import { Component, OnInit } from '@angular/core';
import { Product } from "../../../features/product";
import { CartService } from "../../../features/cart/services/cart.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private readonly cartService: CartService
  protected productsCounter: number

  constructor(cartService: CartService) {
    this.cartService = cartService
    this.productsCounter=0;
  }

  ngOnInit(): void {
    /*this.cartService.loadCartItems();*/

   /* this.cartService.cartItemsCount$.subscribe(count => {
      this.productsCounter = count;
    });*/

   this.cartService.cartQuantityProduct$.subscribe( items => {
      this.productsCounter = this.cartService.getProductQuantityInCart(items);
    })

  }



  public onProductAdded(productToAdd: Product): void {
    this.cartService.addProduct(productToAdd)
  }
}
