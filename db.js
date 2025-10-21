const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./user_data.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS user_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone_number TEXT,
    eircode TEXT
  )`);
});

function insertUser(user) {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`INSERT INTO user_data (first_name, last_name, email, phone_number, eircode) VALUES (?, ?, ?, ?, ?)`);
    stmt.run([user.first_name, user.last_name, user.email, user.phone_number, user.eircode], function (err) {
      if (err) reject(err);
      else resolve();
    });
    stmt.finalize();
  });
}

module.exports = { insertUser };