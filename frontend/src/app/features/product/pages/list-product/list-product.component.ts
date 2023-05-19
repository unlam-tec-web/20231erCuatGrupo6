import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product.interface';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit{

  public productos!: Product[]

  constructor(private productService : ProductService,
    private cartService: CartService){}

  ngOnInit(): void {
    this.productos = this.productService.findAllProducts();
  }

  addProduct(product: Product){
    this.cartService.addProduct(product);
  }


}
