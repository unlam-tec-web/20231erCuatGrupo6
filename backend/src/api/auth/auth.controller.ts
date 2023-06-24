import { Request, Response } from 'express'

import { AuthService } from '../../domain/auth'

export class AuthController {
	readonly #authService: AuthService

	constructor() {
		this.#authService = new AuthService()
	}

	public login(req: Request, res: Response): void {
		const { email, password } = req.body

		this.#authService
			.login(email, password)
			.then(userIsLogged => {
				if (!userIsLogged) {
					res.status(401).send('Credenciales invalidas')
				}

				res.sendStatus(201)
			})
			.catch(err => {
				console.error(`Error found ${err.message}`)
				res.status(500).send({ error: 'Error getting user by id.' })
			})
	}

	public register(req: Request, res: Response): void {
		this.#authService
			.register(req.body)
			.then(() => res.sendStatus(201))
			.catch(err => {
				console.error(`Error found ${err.message}`)
				res.status(500).send({ error: 'Error getting user by id.' })
			})
	}
}
