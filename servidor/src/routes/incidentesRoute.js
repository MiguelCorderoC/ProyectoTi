const conexion = require("../db/mysql.config");
const { Router } = require("express");
const router = Router();

router.get("/incidentes", (req, res) => {
  conexion.query("SELECT * FROM view_incidentes", (error, rows) => {
    if (error) {
      console.error(error);
    } else {
      res.send(rows);
    }
  });
});

router.get("/asignados/:tecnico", (req, res) => {
  conexion.query(
    "SELECT * FROM view_incidentes WHERE tecnico_id = ?",
    [req.params.tecnico],
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

router.get("/incidentes/:usuario", (req, res) => {
  conexion.query(
    "SELECT * FROM view_incidentes WHERE usuario_id = ?",
    [req.params.usuario],
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

router.post("/incidentes", (req, res) => {
  const { nombre, descripcion, usuario_id, equipo_id } = req.body;
  conexion.query(
    "CALL sp_insert_incidente (?, ?, ?, ?)",
    [nombre, descripcion, usuario_id, equipo_id],
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

router.put("/incidentes/:id", (req, res) => {
  const { tecnico_id, prioridad_id } = req.body;
  console.log("Body:" + req.body);
  conexion.query(
    "CALL sp_asignar_incidente (?, ?, ?)",
    [req.params.id, tecnico_id, prioridad_id],
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

router.put("/incidentes/comenzar/:id", (req, res) => {
  conexion.query(
    "CALL sp_comenzar_incidente (?)",
    [req.params.id],
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

router.put("/incidentes/terminar/:id", (req, res) => {
  conexion.query(
    "CALL sp_terminar_incidente (?)",
    [req.params.id],
    (error, rows) => {
      if (error) {
        console.error(error);
      } else {
        res.send(rows);
      }
    }
  );
});

router.put("/incidentes/liberar/:id", (req, res) => {
  conexion.query(
    "CALL sp_liberar_incidente (?)",
    [req.params.id],
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
