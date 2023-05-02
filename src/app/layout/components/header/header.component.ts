import { Component, OnInit } from '@angular/core';
import { Product } from "../../../features/product";

export enum STORAGE_KEYS {
  PRODUCT_COUNTER = 'PRODUCT_COUNTER'
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  protected productsCounter!: number

  public ngOnInit(): void {
    const countInStorage = localStorage.getItem(STORAGE_KEYS.PRODUCT_COUNTER)

    this.productsCounter = countInStorage ? parseInt(countInStorage) : 0
  }

  public onProductAdded(productToAdd: Product): void {
    this.updateCounter()

    // TODO: Logica para añadirlo a una pagina de pedido.
  }

  private updateCounter(): void {
    this.productsCounter += 1
    localStorage.setItem(STORAGE_KEYS.PRODUCT_COUNTER, JSON.stringify(this.productsCounter))
  }
}
