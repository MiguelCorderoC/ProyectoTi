const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/roles", (req, res) => {
  conexion.query("SELECT * FROM roles", (error, rows) => {
    if (error) {
      console.error(error);
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
