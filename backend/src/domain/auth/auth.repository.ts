import { getDatabaseConnection } from "../../database/get-connection";
import { User } from "./user.interface";
import { Connection, RowDataPacket } from "mysql2";


export class AuthRepository {
    readonly #connection: Connection

    constructor() {
        this.#connection = getDatabaseConnection()
    }

    // public getUserByEmail(email: string): Promise<User | null> {
    //     const queryToGetUserByEmail = `
    //         SELECT * FROM user WHERE email = ?
    //     `

    //     return new Promise((res, reject) => {
    //         this.#connection.execute(queryToGetUserByEmail, [email], (err, rows: RowDataPacket[]) => {
    //             if (err) {
    //                 reject(err)
    //                 return
    //             }

    //             res(rows.length ? this.#mapRowsToUser(rows)[0] : null)
    //         })
    //     })
    // }

    // public getUserById(id: number): Promise<User | null> {
    //     const queryToGetUserById = `
    //         SELECT * FROM user WHERE id = ?
    //     `

    //     return new Promise((res, reject) => {
    //         this.#connection.execute(queryToGetUserById, [id], (err, rows: RowDataPacket[]) => {
    //             if (err) {
    //                 reject(err)
    //                 return
    //             }

    //             res(rows.length ? this.#mapRowsToUser(rows)[0] : null)
    //         })
    //     })
    // }

    public getLogin(email: string, password: string): Promise<User | null> {
        const queryToGetUserByEmailAndPassword = `
            SELECT * FROM user WHERE email = ? AND password = ?
        `
        return new Promise((res, reject) => {
            this.#connection.execute(queryToGetUserByEmailAndPassword, [email, password], (err, rows: RowDataPacket[]) => {
                if (err) {
                    reject(err)
                    return 
                }

                res(rows.length ? this.#mapRowsToUser(rows)[0] : null)
            })
        })
    }

    #mapRowsToUser(rows: RowDataPacket[]): User[] {
        return rows.map(row => ({
            id: row.id,
            name: row.name,
            surname: row.surname,
            email: row.email,
            password: row.password,
            address: row.address,
        }))
    }
}