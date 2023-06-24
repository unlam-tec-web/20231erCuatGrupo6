import { User } from "./user.interface";
import { AuthRepository } from "./auth.repository";


export class AuthService {
    readonly #authRepository: AuthRepository

    constructor() {
        this.#authRepository = new AuthRepository()
    }

    public async login(email: string, password: string): Promise<User | null> {
        return this.#authRepository.getLogin(email, password)
    }
}