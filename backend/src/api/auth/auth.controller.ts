import { Request, Response } from "express";
import { AuthService } from "../../domain/auth";

export class AuthController {
  readonly #authService: AuthService;

  constructor() {
    this.#authService = new AuthService();
  }

  public login(req: Request, res: Response): void {
    const {email, password} = req.body;


    Promise.resolve(this.#authService.login(email, password))
      .then((user) => {
        if (!user) {
          res.status(401).send({ message: "Usuario no encontrado" });
          return;
        }

        res.status(200).send({ user });
      })
      .catch((err) => {
        console.error(`Error found ${err.message}`);
        res.status(500).send({ error: "Error getting user by id." });
      });
  }

  // public register(req: Request, res: Response): void {
  //     const { email, password } = req.body
  //     const user = this.#loginService.register(email, password)

  //     if (!user) {
  //         res.status(401).send({ message: "Invalid credentials" })
  //         return
  //     }

  //     res.status(200).send({ user })
  // }
}
