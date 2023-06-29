import { Component, OnInit } from '@angular/core';
import { Product } from "../../../features/product";
import { CartService } from "../../../features/cart/services/cart.service";
import { LoginService } from 'src/app/features/auth/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private readonly cartService: CartService
  private readonly loginService: LoginService
  protected productsCounter: number

  constructor(cartService: CartService, loginService: LoginService) {
    this.cartService = cartService
    this.loginService = loginService
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

  public logout(): void {
    this.loginService.logout()
  }


  public onProductAdded(productToAdd: Product): void {
    this.cartService.addProduct(productToAdd)
  }
}
