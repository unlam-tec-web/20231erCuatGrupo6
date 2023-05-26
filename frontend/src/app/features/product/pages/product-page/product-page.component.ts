import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product.interface';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  public product$!: Observable<Product>;
  public quantity = 1;

  constructor(
    private productService: ProductService,
    private activatedRouter: ActivatedRoute,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.product$ = this.activatedRouter.params.pipe(
      switchMap(({ id }) => this.productService.findProductsById(id))
    );
  }

  add() {
    this.quantity += 1;
  }

  remove() {
    this.quantity > 1 ? this.quantity -= 1 : this.quantity;
  }

  addProduct(product: Product, quantity: number) {
    this.cartService.addProduct(product, quantity);
  }
}
