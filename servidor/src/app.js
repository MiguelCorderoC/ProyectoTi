const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", require("./routes/usuariosRoute"));
app.use("/api", require("./routes/rolesRoute"));
app.use("/api", require("./routes/equiposRoute"));
app.use("/api", require("./routes/edificiosRoute"));
app.use("/api", require("./routes/incidentesRoute"));
app.use("/api", require("./routes/prioridadesRoute"));
app.use("/api", require("./routes/problemasRoute"));
app.use("/api", require("./routes/cambiosRoute"));

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
