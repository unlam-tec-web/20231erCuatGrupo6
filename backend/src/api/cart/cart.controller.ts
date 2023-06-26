import { CartService } from "../../domain/cart";
import { Request, Response } from "express";

export class CartController {
	readonly #cartService: CartService

	constructor() {
		this.#cartService = new CartService()
	}

	public getUserCart(req: Request<{ userId: string }>, res: Response): void {}

	public addProduct(req: Request<{ userId: string }>, res: Response): void {}
	
}
