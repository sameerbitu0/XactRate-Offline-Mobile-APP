import {DatabaseService} from './DatabaseService';

const db = DatabaseService.getDatabaseInstance();

export const InsertDataFunction = async (tableName, data) => {
  try {
    await db.transaction(async tx => {
      // Convert data object to string
      const dataString = JSON.stringify(data);

      // Delete existing data in the table
      await tx.executeSql(`DELETE FROM ${tableName}`);

      // Insert new data
      await tx.executeSql(
        `INSERT INTO ${tableName} (data) VALUES (?)`,
        [dataString],
        (tx, results) => {
          console.log(`Data inserted successfully into ${tableName}`);
        },
      );
    });
  } catch (error) {
    console.error('SQLite Error:', error);
    throw error;
  }
};
