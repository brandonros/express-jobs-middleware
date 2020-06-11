const sqlite3 = require('sqlite3')
const fs = require('fs')
const glob = require('glob')
const path = require('path')

let database = null

const queryDatabase = (sql, bindings) => {
  return new Promise((resolve, reject) => {
    database.all(sql, bindings, (err, res) => {
      if (err) { return reject(err) }
      resolve(res)
    })
  })
}

const initDatabase = async () => {
  database = new sqlite3.Database('db.sqlite')
  // set journal mode
  await queryDatabase('PRAGMA journal_mode = WAL')
  // init schema
  const filenames = glob.sync(path.resolve(__dirname, '../schema/**/*.sql'))
  for (let i = 0; i < filenames.length; ++i) {
    const filename = filenames[i]
    await queryDatabase(fs.readFileSync(filename).toString())
  }
}

module.exports = {
  initDatabase,
  queryDatabase
}
