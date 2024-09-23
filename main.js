import initializeDatabase from "./db/init_db.js"
import printSortedPlayersByRegistered from "./functions/print-sorted-players.js";
import printAllRecords from "./functions/print-all-records.js";
import importPlayersFromCSV from "./functions/import-players-from-csv.js";

const main = async () => {
  await initializeDatabase();
  await importPlayersFromCSV('players.csv');
  await printAllRecords();
  await printSortedPlayersByRegistered();  
}
  
main();