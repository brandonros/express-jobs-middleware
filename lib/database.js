const sqlite3 = require('sqlite3')

let database

const queryDatabase = (sql, bindings) => {
  return new Promise((resolve, reject) => {
    database.all(sql, bindings, (err, res) => {
      if (err) { return reject(err) }
      resolve(res)
    })
  })
}

const initDatabase = async () => {
  database = new sqlite3.Database('db.sqlite');
  await queryDatabase('PRAGMA journal_mode = WAL;')
}

module.exports = {
  initDatabase,
  queryDatabase
}
