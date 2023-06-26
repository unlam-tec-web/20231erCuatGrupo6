import { Connection, RowDataPacket } from "mysql2";
import { CartItem } from "../../../../frontend/src/app/features/cart/types/cart-item";
import { getDatabaseConnection } from "../../database/get-connection";
import { Order } from './order.interface';

export class CartRepository {
	readonly #connection: Connection

	constructor() {
		this.#connection = getDatabaseConnection()
	}

	public postSaveCheckout(id:number,items:CartItem[]):Promise<void>{
			const insertQuery = `
			  INSERT INTO product_order (product_id, order_id, product_quantity)
			  VALUES (?, ?, ?)
			`;
		  
			const insertPromises = items.map((item) => {
			  return new Promise<void>((resolve, reject) => {
				this.#connection.execute(
				  insertQuery,
				  [item.product.id, id, item.quantity],
				  (err) => {
					if (err) {
					  reject(err);
					  return;
					}
					resolve();
				  }
				);
			  });
			});
		  
			return Promise.all(insertPromises).then(() => {});		
		}

	public createOrder(id:number): Promise<void>{
		const createQuery = `
		INSERT INTO ecommerce.order (user_id)
		VALUES (?)
	  `;
	
		return new Promise<void>((resolve, reject) => {
		  this.#connection.execute(
			createQuery,
			[id],
			(err) => {
			  if (err) {
				reject(err);
				return;
			  }
			  resolve();
			}
		  );
		});
	
	} 

	public getOrder(id:number):Promise<Order | null>{
		const queryToGetProductById = `
			SELECT *
			FROM ecommerce.order AS o
			WHERE o.user_id = ?
			ORDER BY o.id DESC
			LIMIT 1
		`

		return new Promise((res, reject) => {
			this.#connection.execute(queryToGetProductById, [id], (err, rows: RowDataPacket[]) => {
				if (err) {
					reject(err)
					return
				}

				res(rows.length ? this.#mapRowsToOrder(rows)[0] : null)
			})
		})
	}

	#mapRowsToOrder(rows: RowDataPacket[]): Order[] {
        return rows.map(row => ({
            id: row.id,
            user_id: row.user_id,
        }))
    }

}
