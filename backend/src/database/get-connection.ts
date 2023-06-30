import { Connection, ConnectionOptions, createConnection } from "mysql2";

let connection: Connection | null = null;

export function getDatabaseConnection(): Connection {
  if (connection) {
    console.log("Re-using connection");
    return connection;
  }

  connection = createConnection(getConfig());
  console.log("Connection was established");

  return connection;
}

function getConfig(): ConnectionOptions {
  return {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
}
