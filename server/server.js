const express = require('express');
const services_db = require('./src/config/services_db');
const app = express();
const initialMigrationController = require('./src/controller/initialMigration.controller');
const port = 10001;

const db = services_db.db;

app.use('/migration', initialMigrationController);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
