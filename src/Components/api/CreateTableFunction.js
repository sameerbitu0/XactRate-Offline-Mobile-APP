import SQLite from 'react-native-sqlite-storage';
// Importing the DatabaseService if it's in a separate file
import {DatabaseService} from './DatabaseService';

// Get the database instance
const db = DatabaseService.getDatabaseInstance();

// Function to create a table if it doesn't exist
export const CreateTableFunction = tableName => {
  // Using transaction to execute SQL queries
  db.transaction(tx => {
    // Check if the table already exists
    tx.executeSql(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`,
      [],
      // Callback function after executing the query
      (tx, results) => {
        // If table doesn't exist, create it
        if (results.rows.length === 0) {
          tx.executeSql(
            // SQL query to create the table
            `CREATE TABLE ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, data TEXT)`,
            [],
            // Success callback
            () => console.log(`Table ${tableName} created successfully`),
            // Error callback
            error => console.error(`SQLite Error: ${error}`),
          );
        } else {
          // Table already exists
          console.log(`Table ${tableName} already exists`);
        }
      },
      // Error callback for the SELECT query
      error => console.error(`SQLite Error: ${error}`),
    );
  });
};
