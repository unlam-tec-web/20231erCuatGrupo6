"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = require("./api");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 5000;
// Make configurations.
app.use(express_1.default.json());
// Bind endpoints to the Express server.
(0, api_1.useProductRoutes)(app);
app.listen(port, () => console.log(`Server is running on port ${port}...`));
