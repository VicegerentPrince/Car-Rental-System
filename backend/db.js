require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'YourPasswordHere',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'CarRental',
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool;

async function getPool() {
  if (!pool) {
    pool = await new sql.ConnectionPool(config).connect();
    console.log('✅ Connected to MS SQL Server');
  }
  return pool;
}

module.exports = { sql, getPool };
