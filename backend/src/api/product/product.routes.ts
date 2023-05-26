import { Application } from "express";
import { ProductController } from "./product.controller";

export function useProductRoutes(app: Application) {
	const controller = new ProductController()
	const endpointPrefix = 'products'

	app.get(`/${endpointPrefix}`, (req, res) => controller.getProducts(req, res))

	app.get(`/${endpointPrefix}/:productId`, (req, res) => controller.getProductById(req, res))
}
