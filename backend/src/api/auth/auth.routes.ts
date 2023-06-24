import { Application } from 'express'
import { AuthController } from './auth.controller'

export function useAuthRoutes(app: Application) {
	const controller = new AuthController()
	const endpointPrefix = 'login'

	app.post(`/${endpointPrefix}`, (req, res) => controller.login(req, res))
	app.post(`/${endpointPrefix}/register`, (req, res) => controller.register(req, res))
}
