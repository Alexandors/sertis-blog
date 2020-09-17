const sqlite3 = require('sqlite3').verbose();
const _ = require('lodash');

let db = null;

function connectDb() {
    db = new sqlite3.Database('./db/blog.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    console.log("Database Connected.")
}



exports.getDb = function () {
    if (_.isNil(db)) {
        connectDb();
    }
    return db;
}
