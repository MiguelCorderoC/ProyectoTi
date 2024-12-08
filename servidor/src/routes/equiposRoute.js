const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/equipos", (req, res) => {
  conexion.query("SELECT * FROM view_equipos", (error, rows) => {
    if (error) {
      console.error(error);
    } else {
      res.send(rows);
    }
  });
});

router.post("/equipos", (req, res) => {
  const {
    nombre,
    marca,
    modelo,
    sistemaoperativo,
    capacidad,
    fecha_adquisicion,
    edificio_id,
  } = req.body;
  console.log(req.body);
  conexion.query(
    "CALL sp_insert_equipo (?, ?, ?, ?, ?, ?, ?)",
    [
      nombre,
      marca,
      modelo,
      sistemaoperativo,
      capacidad,
      fecha_adquisicion,
      edificio_id,
    ],
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
