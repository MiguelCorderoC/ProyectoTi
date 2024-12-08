const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.post("/cambios", (req, res) => {
  const { nombre, descripcion, id_equipo } = req.body;
  conexion.query(
    "CALL sp_insert_cambio (?, ?, ?)",
    [nombre, descripcion, id_equipo],
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

router.get("/cambios", (req, res) => {
  conexion.query("SELECT * FROM view_cambios", (error, rows) => {
    if (error) {
      console.error(error);
    } else {
      res.send(rows);
    }
  });
});

module.exports = router;
