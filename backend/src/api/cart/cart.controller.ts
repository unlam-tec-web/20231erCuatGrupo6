import { CartService } from "../../domain/cart";
import { Request, Response } from "express";
import { Order } from '../../domain/cart/order.interface';

export class CartController {
	readonly #cartService: CartService

	constructor() {
		this.#cartService = new CartService()
	}

	public getUserCart(req: Request<{ userId: string }>, res: Response): void {}

	public addProduct(req: Request<{ userId: string }>, res: Response): void {}

	public saveCheckout(req: Request, res: Response):void {

		const { id, items } = req.body;		

		this.#cartService.createOrder(id);

	 	this.#cartService.getOrder(id)
		.then((orderId: Order | null) => {
			this.#cartService.postSaveCheckout(orderId!.id,items)
				.then(() => res.status(200).send({message:'Compra realizada con exito'}))
				.catch(err => {
					console.error(`Error found ${err.message}`)
					res.status(500).send({ error: 'Error al finalizar compra' })
				})
		  })
		  .catch((error) => {
			res.status(401).send({error:'El nro de orden no existe'})
		  });

		}
	}


