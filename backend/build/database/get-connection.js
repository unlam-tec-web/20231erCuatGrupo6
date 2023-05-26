"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseConnection = void 0;
const mysql_1 = require("mysql");
let connection = null;
function getDatabaseConnection() {
    if (!connection) {
        connection = (0, mysql_1.createConnection)(getConfig());
    }
    return connection;
}
exports.getDatabaseConnection = getDatabaseConnection;
function getConfig() {
    return {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        user: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    };
}
