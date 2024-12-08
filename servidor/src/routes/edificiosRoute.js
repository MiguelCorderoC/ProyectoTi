const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/edificios", (req, res) => {
  conexion.query("SELECT * FROM edificios", (error, rows) => {
    if (error) {
      console.error(error);
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
