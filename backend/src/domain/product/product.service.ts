import { Product } from "./product.interface";
import { ProductRepository } from "./product.repository";

export class ProductService {
	readonly #productRepository: ProductRepository

	constructor() {
		this.#productRepository = new ProductRepository()
	}

	public getProducts(): Promise<Product[]> {
		return this.#productRepository.getProducts()
	}

	public getProductById(productId: number): Promise<Product> {
		return this.#productRepository.getProductById(productId)

	}
}
