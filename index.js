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

app.get("/v1/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/v1/tasks/:id", (req, res) => {
  const id = req.params.id;
  const descripcion = req.body.descripcion;

  db.query(
    "UPDATE tasks SET descripcion=?, dateEdited= WHERE id=?",
    [descripcion, dateEditedNow, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Task updated");
      }
    }
  );
});

app.delete("/v1/tasks/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM tasks WHERE id=?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Task Deleted");
    }
  });
});
