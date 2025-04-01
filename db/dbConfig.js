import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

export const connection = mysql.createConnection({
    host:process.env.database_address,
    user:process.env.database_user,
    database:process.env.database_name,
})

connection.connect()

