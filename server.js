const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mysite",
  password: "212134",
  port: 5432,
});

app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result.rows);
});

app.post("/add-user", async (req, res) => {

  const { name, email } = req.body;

  await pool.query(
    "INSERT INTO users (name, email) VALUES ($1,$2)",
    [name, email]
  );

  res.send("User added");

});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
app.use(express.json());

app.post("/answer", async (req, res) => {
  const { question, answer } = req.body;

  await pool.query(
    "INSERT INTO answers (question, answer) VALUES ($1, $2)",
    [question, answer]
  );

  res.send("Answer saved");
});
app.post("/answer", async (req, res) => {
  const { question, answer } = req.body;

  try {
    await pool.query(
      "INSERT INTO answers(question, answer) VALUES($1,$2)",
      [question, answer]
    );

    res.send("Answer saved");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});