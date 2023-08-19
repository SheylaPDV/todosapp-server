const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Database connection configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "todosapp",
});

// Start the server
app.listen(3001, () => {
  console.log("corriendo en el puerto 3001");
});

// Create a new task
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

// Get all tasks
app.get("/v1/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Update a task
app.put("/v1/tasks/:id", (req, res) => {
  const id = req.params.id;
  const descripcion = req.body.descripcion;
  const completed = req.body.completed;
  console.log(req.body.descripcion);
  console.log(req.body.completed);
  console.log(req.params.id);
  if (req.body.descripcion == undefined) {
    console.log("hola");
    db.query(
      "UPDATE tasks SET completed=? WHERE id=?",
      [completed, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Task updated");
        }
      }
    );
  } else {
    db.query(
      "UPDATE tasks SET descripcion=? WHERE id=?",
      [descripcion, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Task updated");
        }
      }
    );
  }
});

// Delete a task
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
