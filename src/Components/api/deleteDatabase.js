// Import SQLite package
import SQLite from 'react-native-sqlite-storage';

// Function to delete all tables from SQLite database
const deleteAllTables = () => {
  // Open the database
  const db = SQLite.openDatabase(
    {name: 'XactRate.db', location: 'default'},
    () => {
      // Database opened successfully, execute SQL command to get all table names
      db.transaction(tx => {
        tx.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';",
          [],
          (_, resultSet) => {
            // Iterate over the table names and delete each table
            for (let i = 0; i < resultSet.rows.length; i++) {
              const tableName = resultSet.rows.item(i).name;
              tx.executeSql(
                `DROP TABLE IF EXISTS ${tableName};`,
                [],
                () => {
                  console.log(`Table ${tableName} deleted successfully`);
                },
                (_, error) => {
                  console.log(`Error deleting table ${tableName}:`, error);
                },
              );
            }
          },
          (_, error) => {
            console.log('Error retrieving table names:', error);
          },
        );
      });
    },
    error => {
      console.log('Failed to open database:', error);
    },
  );
};

export default deleteAllTables;
