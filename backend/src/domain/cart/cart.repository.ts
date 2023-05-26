import { Connection } from "mysql2";
import { getDatabaseConnection } from "../../database/get-connection";

export class CartRepository {
	readonly #connection: Connection

	constructor() {
		this.#connection = getDatabaseConnection()
	}


}
