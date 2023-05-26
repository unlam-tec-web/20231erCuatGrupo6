"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProductRoutes = void 0;
const product_controller_1 = require("./product.controller");
function useProductRoutes(app) {
    const controller = new product_controller_1.ProductController();
    const endpointPrefix = '/products';
    app.use(`${endpointPrefix}/`, (req, res) => controller.getProducts(req, res));
}
exports.useProductRoutes = useProductRoutes;
