const express = require("express");
const services_db = require("../config/services_db.js");
const db = services_db.db;
const router = express.Router();

//Indicates that the request body should be handled in JSON format
router.use(express.json);

router.post("/new", (req, res) => {
  const data = req.body;
  const sql = "INSERT INTO comprar (nombre, tipo, url) VALUES (?, ?, ?)";
  db.run(sql, [data.nombre, data.tipo, data.url], function (err) {
    if (err) {
      return res.send(err);
    }
    res.send("La instancia ha sido creada con éxito.");
  });
});

module.exports = router;
