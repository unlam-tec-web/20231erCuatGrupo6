import { Component } from '@angular/core';
import { Product } from '../../types/product.interface';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap,tap } from 'rxjs';
import { __param } from 'tslib';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent {
  public product!: Product;

  constructor(
    private productService: ProductService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    ){}

  ngOnInit(): void {

   this.activatedRouter.params
   .subscribe(({id}) => {
     this.product = this.productService.findProductsById(id);
    }
   );

   console.log(this.product)
}
}
