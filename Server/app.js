const express = require('express');
const app = express();
const sqlite3 = require("sqlite3").verbose();

//Database connection
const db = new sqlite3.Database("../Data.db", (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Connected to the database.");
});

//Settings
app.set('port', process.env.PORT || 3060);

//Principal App
app.listen(app.get('port'), () => {
    console.log('Server on port 3060');
});