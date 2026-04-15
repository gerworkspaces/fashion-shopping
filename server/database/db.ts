/* utils db.ts */

// DB connection setup
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '12346578',
    database: 'fashion_shopping',
    waitForConnections: true,
    connectionLimit: 10,
    port: 3306,
    charset: 'utf8mb4',
});

export default pool;