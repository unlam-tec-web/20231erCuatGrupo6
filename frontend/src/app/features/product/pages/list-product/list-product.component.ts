import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product.interface';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../../cart/services/cart.service';
import { from, groupBy, map, mergeMap, Observable, toArray } from 'rxjs';

type GroupedProduct = {
  category: string;
  products: Product[];
};

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
  public groupedProducts!: Observable<GroupedProduct[]>;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.groupedProducts = this.groupItemsByCategory();
  }

  addProduct(product: Product) {
    this.cartService.addProduct(product);
  }

  groupItemsByCategory() {
    const products = this.productService.findAllProducts();

    return products.pipe(
      mergeMap(from),
      groupBy((product) => product.category),
      mergeMap((productGroup) =>
        productGroup.pipe(
          toArray(),
          map((products) => ({
            category: productGroup.key,
            products: products,
          }))
        )
      ),
      toArray()
    );
  }
}
