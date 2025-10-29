// server.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Secret key for signing JWT
const JWT_SECRET = "mysecretkey"; // (in real apps, keep this in .env file)

// Sample hardcoded user
const user = {
  username: "nimbusUser",
  password: "12345",
};

// ---------------- LOGIN ROUTE ----------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate credentials
  if (username === user.username && password === user.password) {
    // Generate JWT token (valid for 1 hour)
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ message: "Login successful!", token });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

// ---------------- MIDDLEWARE TO VERIFY TOKEN ----------------
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Bearer <token>

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.user = decoded; // Save decoded user info for next middleware
    next();
  });
}

// ---------------- PROTECTED ROUTE ----------------
app.get("/protected", verifyToken, (req, res) => {
  res.json({
    message: `Hello ${req.user.username}, you have accessed a protected route!`,
  });
});

// ---------------- START SERVER ----------------
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
