import { getDatabaseConnection } from "../../database/get-connection";
import { Cart } from "../cart/cart.interface";
import { User } from "./user.interface";
import { Connection, RowDataPacket } from "mysql2";

export class AuthRepository {
  readonly #connection: Connection;

  constructor() {
    this.#connection = getDatabaseConnection();
  }

  public getLogin(email: string, password: string): Promise<User | null> {
    const queryToGetUserByEmailAndPassword = `
            SELECT * FROM user WHERE email = ? AND password = ?
        `;
    return new Promise((res, reject) => {
      this.#connection.execute(
        queryToGetUserByEmailAndPassword,
        [email, password],
        (err, rows: RowDataPacket[]) => {
          if (err) {
            reject(err);
            return;
          }

          res(rows.length ? this.#mapRowsToUser(rows)[0] : null);
        }
      );
    });
  }

  public register(
    name: string,
    surname: string,
    email: string,
    password: string,
    address: string
  ): Promise<User | null> {
    const queryToGetUserByEmailAndPassword = `
            INSERT INTO user (name, surname, email, password, address) VALUES (?, ?, ?, ?, ?)
        `;
    return new Promise((res, reject) => {
      this.#connection.execute(
        queryToGetUserByEmailAndPassword,
        [name, surname, email, password, address],
        (err, rows: RowDataPacket[]) => {
          if (err) {
            reject(err);
            return;
          }

          res(rows.length ? this.#mapRowsToUser(rows)[0] : null);
        }
      );
    });
  }

  public checkIfEmailExists(email: string): Promise<boolean> {
    const queryToGetUserByEmail = `
            SELECT * FROM user WHERE email = ?
        `;

    return new Promise((res, reject) => {
      this.#connection.execute(
        queryToGetUserByEmail,
        [email],
        (err, rows: RowDataPacket[]) => {
          if (err) {
            reject(err);
            return;
          }

          res(rows.length > 0);
        }
      );
    });
  }

  public saveConfirmationCode(
    userId: number,
    confirmationCode: string,
    status: boolean
  ): Promise<void> {
    const queryToGetUserByEmail = `
            UPDATE user SET confirmationCode = ?, status = ? WHERE id = ?
        `;

    return new Promise((res, reject) => {
      this.#connection.execute(
        queryToGetUserByEmail,
        [confirmationCode,status, userId],
        (err, rows: RowDataPacket[]) => {
          if (err) {
            reject(err);
            return;
          }

          res();
        }
      );
    });
  }

  public findEmail(email: string): Promise<User | null> {
    const queryToGetUserByEmail = `
            SELECT * FROM user WHERE email = ?
        `;

    return new Promise((res, reject) => {
      this.#connection.execute(
        queryToGetUserByEmail,
        [email],
        (err, rows: RowDataPacket[]) => {
          if (err) {
            reject(err);
            return;
          }

          res(rows.length ? this.#mapRowsToUser(rows)[0] : null);
        }
      );
    });
  }

  public findUserByConfirmationCode(
    confirmationCode: string
  ): Promise<User | null> {
    const queryToGetUserByEmail = `
            SELECT * FROM user WHERE confirmationCode = ?
        `;

    return new Promise((res, reject) => {
      this.#connection.execute(
        queryToGetUserByEmail,
        [confirmationCode],
        (err, rows: RowDataPacket[]) => {
          if (err) {
            reject(err);
            return;
          }

          res(rows.length ? this.#mapRowsToUser(rows)[0] : null);
        }
      );
    });
  }

  public updateUserStatus(userId : number, status: boolean): Promise<void> {
    const queryToGetUserByEmail = `
            UPDATE user SET status = ? WHERE id = ?
        `;

    return new Promise((res, reject) => {
      this.#connection.execute(
        queryToGetUserByEmail,
        [status, userId],
        (err, rows: RowDataPacket[]) => {
          if (err) {
            reject(err);
            return;
          }

          res();
        }
      );
    });
  }
  #mapRowsToUser(rows: RowDataPacket[]): User[] {
    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      surname: row.surname,
      email: row.email,
      password: row.password,
      address: row.address,
      confirmationCode: row.confirmationCode,
      status: row.status,
    }));
  }
}
