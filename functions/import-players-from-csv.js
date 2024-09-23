import fs from 'fs';
import csv from 'csv-parser';
import pool from '../db/db.js';
import { getFormattedDateString } from '../utils/get-formatted-date-string.js';

const MILLISECONDS_IN_MUNITE = 1000 * 60;
const QUERY_INSERT = 'INSERT INTO players (nickname, email, registered, status) VALUES ($1, $2, $3, $4)';

export default async function importPlayersFromCSV(filePath) {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', async () => {
      try {
        for (let row of results) {
          const formattedDateString = getFormattedDateString(row['Зарегистрирован']);

          let registered = new Date(formattedDateString).getTime() / MILLISECONDS_IN_MUNITE;

          await pool.query(
            QUERY_INSERT,
            [row['Ник'], row['Email'], registered, row['Статус']]
          );
        }
        console.log('Данные импортированы:');
        resolve();
      } catch (err) {
        console.error('Ошибка при чтении файла: ', err);
        reject(err);
      }
    })
  });
}