const express = require('express');
const app = express();
const initialMigrationController = require('./src/controller/initialMigration.controller');
const tobuy = require('./src/controller/tobuy.controller')
const port = 10001;

app.use('/migration', initialMigrationController);
app.use('/tobuy', tobuy);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
