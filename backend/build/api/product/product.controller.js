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
var _ProductController_productService;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_1 = require("../../domain/product");
class ProductController {
    constructor() {
        _ProductController_productService.set(this, void 0);
        __classPrivateFieldSet(this, _ProductController_productService, new product_1.ProductService(), "f");
    }
    getProducts(req, res) {
        __classPrivateFieldGet(this, _ProductController_productService, "f").getProducts()
            .then(products => res.status(200).send(products))
            .catch(err => {
            console.error(`Error found ${err.message}`);
            res.status(500).send({ error: 'Error getting products.' });
        });
    }
}
exports.ProductController = ProductController;
_ProductController_productService = new WeakMap();
