import { CartItem } from "../../../../frontend/src/app/features/cart/types/cart-item";
import { CartRepository } from "./cart.repository";
import { Order } from './order.interface';

export class CartService {
	readonly #cartRepository: CartRepository

	constructor() {
		this.#cartRepository = new CartRepository()
	}

	public postSaveCheckout(id:number,items: CartItem[]):Promise<void>{
		
		 return this.#cartRepository.postSaveCheckout(id, items);
	}

	public createOrder(id:number): Promise<void>{

		return this.#cartRepository.createOrder(id);
	}

	public getOrder(id:number):Promise<Order | null>{
		
		return this.#cartRepository.getOrder(id);
	}
}
