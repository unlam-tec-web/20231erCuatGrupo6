import { Request, Response } from "express";
import { ProductService } from "../../domain/product";

export class ProductController {
	readonly #productService: ProductService

	constructor() {
		this.#productService = new ProductService()
	}

	public getProducts(req: Request, res: Response): void {
		this.#productService.getProducts()
			.then(products => res.status(200).send(products))
			.catch(err => {
				console.error(`Error found ${err.message}`)
				res.status(500).send({ error: 'Error getting products.' })
			})
	}

	public getProductById(req: Request<{ productId: string }>, res: Response): void {
		const parsedId = parseInt(req.params.productId)

		this.#productService.getProductById(parsedId)
			.then(product => {
				if (!product) {
					res.status(404).send({ error: "The product was not found." })
					return
				}

				res.status(200).send(product)
			})
			.catch(err => {
				console.error(`Error found ${err.message}`)
				res.status(500).send({ error: 'Error getting product by id.' })
			})
	}
}
