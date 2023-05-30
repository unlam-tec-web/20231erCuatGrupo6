import { Product } from "./product.interface";
import { ProductRepository } from "./product.repository";

export class ProductService {
	readonly #productRepository: ProductRepository

	constructor() {
		this.#productRepository = new ProductRepository()
	}

	public getProducts(searchTerm: string | undefined): Promise<Product[]> {
		if (searchTerm)
			return this.#productRepository.getProductsBySearchTerm(searchTerm)

		return this.#productRepository.getProducts()
	}

	public getProductById(productId: number): Promise<Product | null> {
		return this.#productRepository.getProductById(productId)
	}
}
