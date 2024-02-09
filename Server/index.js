import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import mysql from "mysql";
import jwt from "jsonwebtoken";
const app = express();
import cookieParser from 'cookie-parser';


app.use(cors(
    {
      origin: ["http://localhost:5173"],
      methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
      credentials: true
    }
  ));
  app.use(cookieParser());
app.use(express.json());
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "verlynk",
});

const salrounds = 10;
app.post("/create", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, salrounds, (err, hash) => {
    if (err) {
      return res.json({ error: "Error hashing password" });
    }

    const sql =
      "INSERT into users(`name` , `email`, `password`) VALUES (?,?,?)";
    const values = [name, email, hash];

    con.query(sql, values, (err, result) => {
      if (err) {
        return res.json("Error inserting data");
      } else {
        return res.json({ status: "Success" });
      }
    });
  });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";
    
    con.query(sql, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: "Email not found" });
        }
        
        const user = result[0];
        
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ error: "Internal server error" });
            }
            if (isMatch) {
                const token = jwt.sign({ id: user.id }, "JWT-KEY", { expiresIn: '1d' });
                res.cookie('token', token, { httpOnly: true, maxAge: 86400 });
                return res.json({ status: "Success" });
            } else {
                return res.status(401).json({ error: "Incorrect password" });
            }
        });
    });
});


  app.post('/blog', (req, res) => {
    const { subtitle, title, description } = req.body;
    const sql = 'INSERT INTO blogs (subtitle, title, description) VALUES (?, ?, ?)';
    const values = [subtitle, title, description];
    
    con.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error adding blog:', err);
        return res.status(500).json({ error: 'Error adding blog' });
      }
      console.log('Blog added:', result);
      return res.json({ message: 'Blog added successfully' });
    });
  });

  app.get("/getBlogs", (req, res) => {
    const sql = "SELECT * FROM blogs";
    con.query(sql, (err, result) => {
        if (err) {
            return res.json({ Status: "Error", Error: "Error getting data" });
        }
        return res.json({ Status: "Success", Result: result });
    });
});

app.delete("/deleteblog/:id", (req, res) => {
  const blogId = req.params.id;
  const sql = "DELETE FROM blogs WHERE id = ?";
  con.query(sql, [blogId], (err, result) => {
      if (err) {
          console.error("Error deleting blog:", err);
          return res.status(500).json({ Status: "Error", Error: "Error deleting blog" });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ Status: "Error", Error: "Blog not found" });
      }
      return res.json({ Status: "Success", Result: result });
  });
});


app.put("/updateblog/:id", (req, res) => {
  const blogId = req.params.id;
  const { title, subtitle, description } = req.body;
  const sql = "UPDATE blogs SET title = ?, subtitle = ?, description = ? WHERE id = ?";
  con.query(sql, [title, subtitle, description, blogId], (err, result) => {
      if (err) {
          console.error("Error updating blog:", err);
          return res.status(500).json({ Status: "Error", Error: "Error updating blog" });
      }
      if (result.affectedRows === 0) {
          return res.status(404).json({ Status: "Error", Error: "Blog not found" });
      }
      return res.json({ Status: "Success", Result: result });
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: "Success" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
