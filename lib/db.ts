import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "virtual_do",
})

export default pool
