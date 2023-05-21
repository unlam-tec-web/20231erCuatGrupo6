import { Component } from '@angular/core';
import { Product } from '../../types/product.interface';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap,tap } from 'rxjs';
import { __param } from 'tslib';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  public product!: Product;
  public quantity: number = 1;

  constructor(
    private productService: ProductService,
    private activatedRouter: ActivatedRoute,
    private cartService: CartService,
    ){}

  ngOnInit(): void {

    this.activatedRouter.params
    .subscribe(({id}) => {
      this.product = this.productService.findProductsById(id);
      }
    );
  }

  add(){
    this.quantity += 1;
  }

  remove(){
    this.quantity > 1 ? this.quantity -= 1 : this.quantity;
  }

  addProduct(product: Product, quantity: number){
    this.cartService.addProduct(product, quantity);
  }

}
