const mysql = require('mysql2/promise');
require('dotenv').config();

const Connection = async () => {
    try{
        database = await mysql.createConnection({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            host:process.env.DB_HOST
        });

    }
    catch(err){
        return null
    }
    
    return database
}


module.exports = Connection;