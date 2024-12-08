const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/problemas", (req, res) => {
  conexion.query("SELECT * FROM view_problemas", (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      res.send(rows);
    }
  });
});

router.get("/problemas/tecnico/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "SELECT * FROM view_problemas WHERE tecnico_id = ?",
    [id],
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

router.post("/problemas", (req, res) => {
  const { nombre, descripcion, id_tecnico, id_equipo } = req.body;
  conexion.query(
    "CALL sp_insert_problema (?, ?, ?, ?)",
    [nombre, descripcion, id_tecnico, id_equipo],
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

module.exports = router;
