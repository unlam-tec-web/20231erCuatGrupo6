import { Component, EventEmitter, Output } from '@angular/core';
import { Product, ProductService } from "../../../features/product";
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  protected products: Observable<Product[]>
  private readonly productService: ProductService
  @Output()
  private readonly productAddedEvent: EventEmitter<Product>

  constructor(productService: ProductService) {
    this.products = of([])
    this.productService = productService
    this.productAddedEvent = new EventEmitter<Product>()
  }

  public addProductToCart(product: Product): void {
    this.productAddedEvent.emit(product)
  }

  public onProductSearch(event: Event): void {
    const target = event.target as HTMLInputElement
    const productName = target.value.trim().toLowerCase()

    this.products = this.getProductsToRender(productName)
  }

  private getProductsToRender(searchTerm: string): Observable<Product[]> {
    return searchTerm
      ? this.productService.findProductsBySearchTerm(searchTerm)
      : of([])
  }
}
