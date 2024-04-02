// DatabaseService.js
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'XactRate.db',
    location: 'default',
  },
  () => console.log('Database opened successfully.'),
  error => console.error('Database open error: ', error),
);

export const DatabaseService = {
  getDatabaseInstance: () => db,
  // Add more methods for interacting with the database as needed
};
