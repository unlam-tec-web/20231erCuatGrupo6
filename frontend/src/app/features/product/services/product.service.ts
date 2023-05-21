import { Injectable } from '@angular/core';
import { Product } from "../types/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public findAllProducts(): Product[] {
    return this.getFakeProducts()
  }

  public findProductsByName(name: string): Product[] {
    return this.getFakeProducts()
      .filter(product => product.name.toLowerCase().includes(name))
  }

  public findProductsById(id: number): Product {

    var product!: Product;
    
    this.getFakeProducts().forEach(produc => {
      if(produc.id == id ){
        product =  produc;
      }
    });
    
    return product;
    
  }

  private getFakeProducts(): Product[] {
    return [
      { id: 1, category: "Farmacia", name: 'Alcohol', description: "bla bla bla", price: 2500 },
      { id: 2, category: "Comida", name: 'Tostada', description: "bla bla bla bla bla bla", price: 4300 }
    ]
  }
}