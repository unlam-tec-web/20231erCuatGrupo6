import { getDatabaseConnection } from "../../database/get-connection";
import { Product } from "./product.interface";
import { Connection, RowDataPacket } from "mysql2";

export class ProductRepository {
	readonly #connection: Connection

	constructor() {
		this.#connection = getDatabaseConnection()
	}

	public getProductById(id: number): Promise<Product | null> {
		const queryToGetProductById = `
			SELECT p.*, pt.name as category 
			FROM product p JOIN product_type pt on pt.id = p.product_type_id
			WHERE p.id = ?
		`

		return new Promise((res, reject) => {
			this.#connection.execute(queryToGetProductById, [id], (err, rows: RowDataPacket[]) => {
				if (err) {
					reject(err)
					return
				}

				res(rows.length ? this.#mapRowsToProduct(rows)[0] : null)
			})
		})
	}

	public getProductsBySearchTerm(searchTerm: string): Promise<Product[]> {
		const queryToGetProducts = `
			SELECT p.*, pt.name as category 
			FROM product p JOIN product_type pt on pt.id = p.product_type_id
			WHERE p.name LIKE ? OR p.description LIKE ? OR pt.name LIKE ?
		`
		const queryValues = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]

		return new Promise((res, reject) => {
			this.#connection.execute(queryToGetProducts, queryValues, (err, rows: RowDataPacket[]) => {
				if (err) {
					reject(err)
					return
				}

				res(this.#mapRowsToProduct(rows))
			})
		})
	}

	public getProducts(): Promise<Product[]> {
		const queryToGetProducts = `
			SELECT p.*, pt.name as category 
			FROM product p JOIN product_type pt on pt.id = p.product_type_id;
		`

		return new Promise((res, reject) => {
			this.#connection.query(queryToGetProducts, (err, rows: RowDataPacket[]) => {
				if (err) {
					reject(err)
					return
				}

				res(this.#mapRowsToProduct(rows))
			})
		})
	}

	#mapRowsToProduct(rows: RowDataPacket[]): Product[] {
		return rows.map(({ product_type_id, ...rest }) => ({
			...rest,
			price: parseFloat(rest.price)
		})) as Product[]
	}
}
