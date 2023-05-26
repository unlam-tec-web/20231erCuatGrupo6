import { CartRepository } from "./cart.repository";

export class CartService {
	readonly #cartRepository: CartRepository

	constructor() {
		this.#cartRepository = new CartRepository()
	}
}
