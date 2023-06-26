import { Application } from "express";
import { CartController } from "./cart.controller";

export function useCartRoutes(app: Application) {
	const controller = new CartController()
	const endpointPrefix = 'carts'


	app.get(`/${endpointPrefix}/user/:userId`, (req, res) => controller.getUserCart(req, res))
	app.post(`/${endpointPrefix}/user/:userId`, (req, res) => controller.addProduct(req, res))
	app.post(`/checkout`, (req,res) => controller.saveCheckout(req,res))
}
