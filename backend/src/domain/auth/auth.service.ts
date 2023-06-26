import { User } from "./user.interface";
import { AuthRepository } from "./auth.repository";

export class AuthService {
  readonly #authRepository: AuthRepository;

  constructor() {
    this.#authRepository = new AuthRepository();
  }

  public async login(email: string, password: string): Promise<User | null> {
    return this.#authRepository.getLogin(email, password);
  }

  public async register(
    name: string,
    surname: string,
    email: string,
    password: string,
    address: string
  ): Promise<User | null> {
    return this.#authRepository.register(
      name,
      surname,
      email,
      password,
      address
    );
  }

  public async checkIfEmailExists(email: string): Promise<boolean> {
    return this.#authRepository.checkIfEmailExists(email);
  }
  public async saveConfirmationCode(
    userId: number,
    confirmationCode: string,
    status: boolean
  ): Promise<void> {
    return this.#authRepository.saveConfirmationCode(userId, confirmationCode,status);
  }

  public async findEmail(email: string): Promise<User | null> {
    return this.#authRepository.findEmail(email);
  }

  public async findUserByConfirmationCode(
    confirmationCode: string
  ): Promise<User | null> {
    return this.#authRepository.findUserByConfirmationCode(confirmationCode);
  }

  public updateUserStatus(userId: number, status: boolean): Promise<void> {
    return this.#authRepository.updateUserStatus(userId, status);
  }
}
