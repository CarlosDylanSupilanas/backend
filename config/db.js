import mysql from 'mysql2/promise.js'

const pool = mysql.createPool({
    host:"localhost",
    user:"admin",
    password: "",
    database: "library"
})

export default pool;