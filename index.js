const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // You can specify origin if needed
app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: true
}));

app.use(express.static("frontend"));


// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "JMDb",
  password: "123456789"
});

// Sign-Up Route
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  connection.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err, results) => {
      if (err) return res.status(500).send("Error creating user");
      res.status(200).send("User created");
    }
  );
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err || results.length === 0) return res.status(401).send("Invalid credentials");

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) return res.status(401).send("Invalid credentials");

      // Save user in session
      req.session.userId = user.user_id;
      res.status(200).send("Login successful");
    }
  );
});

// Add to Watchlist
app.post("/add-to-watchlist", (req, res) => {
  const userId = req.session.userId;
  const { movieId } = req.body;

  if (!userId) return res.status(401).send("Not logged in");

  connection.query(
    "INSERT INTO watchlist (movie_id, user_id) VALUES (?, ?)",
    [movieId, userId],
    (err, results) => {
      if (err) return res.status(500).send("Error adding to watchlist");
      res.status(200).send("Added to watchlist");
    }
  );
});

// Get Watchlist
app.get("/watchlist", (req, res) => {
  const userId = req.session.userId;
  if (!userId) return res.status(401).send("Not logged in");

  connection.query(
    `SELECT m.* FROM movies m 
     JOIN watchlist w ON m.movie_id = w.movie_id 
     WHERE w.user_id = ?`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).send("Error getting watchlist");
      res.json(results);
    }
  );
});

const path = require("path");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});


app.listen(8008);