import pool from "../config/db.js";

// CREATE USER
export const insert = async (name, email, password) => {
  const [result] = await pool.query(
    "INSERT INTO user(name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
  );

  return result.insertId;
};

// FIND USER BY EMAIL
export const findUserByEmail = async (email) => {
  const [rows] = await pool.execute("SELECT * FROM user WHERE email = ?", [
    email,
  ]);

  return rows || [];
};
