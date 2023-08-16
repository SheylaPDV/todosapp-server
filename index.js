const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Conexion a base de datos
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "todosapp",
});

app.listen(3001, () => {
  console.log("corriendo en el puerto 3001");
});

app.post("/v1/tasks", (req, res) => {
  const descripcion = req.body.descripcion;

  db.query(
    "INSERT INTO tasks(descripcion) VALUES(?)",
    [descripcion],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Task created");
      }
    }
  );
});
