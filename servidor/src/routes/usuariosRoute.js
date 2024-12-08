const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/usuarios", (req, res) => {
  conexion.query("SELECT * FROM view_usuarios", (error, rows) => {
    if (error) {
      console.error(error);
    } else {
      res.send(rows);
    }
  });
});

router.get("/tecnicos", (req, res) => {
  conexion.query(
    "SELECT * FROM view_usuarios WHERE rol_nombre = ?",
    ["Tecnico"],
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

router.get("/usuarios/:correo", (req, res) => {
  conexion.query(
    "SELECT * FROM view_usuarios WHERE usuario_correo = ?",
    [req.params.correo],
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

router.post("/usuarios", (req, res) => {
  const { nombre, apellidopaterno, apellidomaterno, correo, rol_id } = req.body;
  console.log(req.body);
  conexion.query(
    "CALL sp_insert_usuario (?, ?, ?, ?, ?)",
    [nombre, apellidopaterno, apellidomaterno, correo, rol_id],
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
