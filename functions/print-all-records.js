import pool from "../db/db.js";

export default async function printAllRecords() {
  try {
    const res = await pool.query('SELECT * FROM players');
    console.table(res.rows);
  } catch (err) {
    console.error('Ошибка при выводе таблицы: ', err)
  }
}