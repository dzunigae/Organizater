//creation and connection to the "Services" database
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('servicesdatabase.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Conectado a la base de datos.');
});

// if it don't exist, create the table
/*db.run(`CREATE TABLE IF NOT EXISTS mytable (
    id INTEGER PRIMARY KEY,
    name TEXT
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Tabla creada.');
});*/