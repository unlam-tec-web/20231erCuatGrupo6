"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ProductService_connection;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const get_connection_1 = require("../../database/get-connection");
class ProductService {
    constructor() {
        _ProductService_connection.set(this, void 0);
        __classPrivateFieldSet(this, _ProductService_connection, (0, get_connection_1.getDatabaseConnection)(), "f");
    }
    getProducts() {
        const queryToGetProducts = `SELECT * FROM product JOIN product_type pt on pt.id = product.product_type_id;`;
        return new Promise((res, reject) => {
            __classPrivateFieldGet(this, _ProductService_connection, "f").query(queryToGetProducts, (err, products) => {
                err ? reject(err) : res(products);
            });
        });
    }
}
exports.ProductService = ProductService;
_ProductService_connection = new WeakMap();
