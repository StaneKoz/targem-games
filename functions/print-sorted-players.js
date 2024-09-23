import pool from "../db/db.js";

const SORTING_QUERY = `SELECT * FROM players WHERE status = 'On' ORDER BY registered ASC;`;

export default async function printSortedPlayersByRegistered() {
  try {
    const res = await pool.query(SORTING_QUERY);
    console.log(`Все игроки со статусом 'On', отсортированные по дате регистрации: `)
    console.table(res.rows)
  } catch (err) {
    console.error('Ошибка при сортировке записей: ', err)
  }
}