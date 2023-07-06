import mysql from 'mysql'

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Babi-Terik123",
    database:"website",
})