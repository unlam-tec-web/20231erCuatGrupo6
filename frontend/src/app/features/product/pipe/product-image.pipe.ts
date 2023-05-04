import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../types/product.interface';

@Pipe({
  name: 'productImage'
})
export class ProductImagePipe implements PipeTransform {

  transform(product: Product): string {

    return `assets/productos/${product.name}.jpg`;
  }

}
