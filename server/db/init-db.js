const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/blog.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
});


db.serialize(function() {
    db.run("CREATE TABLE user (" +
        "id int NOT NULL AUTO_INCREMENT" +
        "" +
        ")")


});
