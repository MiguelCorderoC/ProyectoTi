const mysql = require("mysql");

const conexion = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "gestiondata",
  user: "root",
  password: "",
});

conexion.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Conexion a la base de datos");
  }
});

module.exports = conexion;
