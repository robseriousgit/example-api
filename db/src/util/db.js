import sqlite3 from 'better-sqlite3';
import path from 'path'

const db = (dbFile) => {
  if (!dbFile) throw new Error('There was an error initialising the database, db file not provided');
  try {
    const dbObject = new sqlite3(path.resolve(dbFile), {fileMustExist: true});
    // Load extenstion that allows SIN, SQRT
    dbObject.loadExtension(path.resolve('../db/sqlite_extensions/extension-functions'), )
    
    return dbObject;
  } catch ( err ) {
    throw new Error(err);
  }  
};

export default db;
