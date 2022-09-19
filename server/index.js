import express from "express";
import mysql from "mysql";
const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "b81fd1c7",
  database: "test",
});
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use(express.json());
////get all books
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
////create a book
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`) VALUES (?)";
  const values = [req.body.title, req.body.desc, req.body.cover];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("book created");
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
