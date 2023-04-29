import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  protected productsInCart: number

  constructor() {
    this.productsInCart = 0
  }

  public onProductAdded(): void {
    this.productsInCart += 1

    // TODO: Logica para añadirlo a una pagina de pedido.
  }
}
