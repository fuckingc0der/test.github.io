const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.sqlite3');

// Создание таблиц, если их еще нет
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY, product_id INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY, product_id INTEGER)");
});

module.exports = db;
