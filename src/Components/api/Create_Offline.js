import {DatabaseService} from './DatabaseService';

const db = DatabaseService.getDatabaseInstance();

export const InsertDataFunction2 = async (tableName, data) => {
  try {
    await db.transaction(async tx => {
      // Convert data object to string
      const dataString = JSON.stringify(data);

      // Insert new data without deleting existing data
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
