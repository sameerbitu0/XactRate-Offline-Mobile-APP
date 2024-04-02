import SQLite from 'react-native-sqlite-storage';

// Function to clear a table in SQLite database
const deleteTable = tableName => {
  SQLite.openDatabase(
    {name: 'XactRate.db', location: 'default'},
    db => {
      db.transaction(tx => {
        tx.executeSql(
          `DELETE FROM ${tableName}`,
          [],
          () => {},
          error => {
            console.error(error);
          },
        );
      });
    },
    error => {
      console.error(error);
    },
  );
};

export default deleteTable;
