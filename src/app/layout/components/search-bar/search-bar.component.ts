import { Component, EventEmitter, Output } from '@angular/core';
import { Product, ProductService } from "../../../features/product";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  protected products: Product[]
  private readonly productService: ProductService
  @Output()
  private readonly productAddedEvent: EventEmitter<Product>

  constructor(productService: ProductService) {
    this.products = []
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

  private getProductsToRender(searchTerm: string): Product[] {
    return searchTerm
      ? this.productService.findProductsByName(searchTerm)
      : []
  }
}
