import { Application } from "express";
import { AuthController } from "./auth.controller";

export function useAuthRoutes(app: Application) {
    const controller = new AuthController()
    const endpointPrefix = 'login'
    const registerEndpointPrefix = 'register'
    const verifyEndpointPrefix = 'confirm'

    app.post(`/${endpointPrefix}`, (req, res) => controller.login(req, res))
    app.post(`/${registerEndpointPrefix}`, (req, res) => controller.register(req, res))
    app.get(`/${verifyEndpointPrefix}/:confirmationCode`, (req, res) => controller.verifyUser(req, res))
}
