import pool from "./db.js"

export default async function initializeDatabase() {
  try {
    await pool.query('TRUNCATE players');

    const res = await pool.query('SELECT * FROM players');
    if (res.rows == 0) {
      console.log('Таблица пуста: ');
      const queryRes = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name = 'players';`);
      console.log(queryRes.rows.map(elem => elem.column_name).join(' | '));
    }
  } catch (err) {
    console.error(err)
  }
}