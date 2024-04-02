import SQLite from 'react-native-sqlite-storage';
import {DatabaseService} from './DatabaseService';

const db = DatabaseService.getDatabaseInstance();

export const GetAllDataFunction = tableName => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${tableName}`,
        [],
        (tx, results) => {
          if (results.rows.length === 0) {
            resolve([]);
          } else {
            const apiData = [];
            for (let i = 0; i < results.rows.length; i++) {
              const rowData = results.rows.item(i);
              const parsedData = JSON.parse(rowData.data);
              apiData.push(parsedData);
            }
            const flattenedData = apiData.flat();
            resolve(flattenedData);
          }
        },
        (tx, error) => {
          if (
            error &&
            error.message &&
            error.message.includes('no such table')
          ) {
            resolve([]);
          } else {
            console.error(`SQLite Error: ${error}`);
            reject(error);
          }
        },
      );
    });
  });
};
