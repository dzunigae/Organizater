const express = require('express');
const serviceDB = require('../config/services_db.js');
const router = express.Router();

router.get('/initialmigration', (req, res) => {
    serviceDB.t_creation();
    res.send('Initial migration done');
});

module.exports = router;