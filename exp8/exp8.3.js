// server.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// Secret key for JWT signing (in real apps, keep in .env)
const JWT_SECRET = "mysecretkey123";

// ------------------- SAMPLE USERS -------------------
const users = [
  { username: "adminUser", password: "12345", role: "Admin" },
  { username: "modUser", password: "12345", role: "Moderator" },
  { username: "normalUser", password: "12345", role: "User" },
];

// ------------------- LOGIN ROUTE -------------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate JWT token with role info in payload
  const token = jwt.sign(
    { username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token,
  });
});

// ------------------- VERIFY TOKEN MIDDLEWARE -------------------
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(403).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid or expired token" });

    req.user = decoded; // Attach decoded info to request
    next();
  });
}

// ------------------- ROLE CHECK MIDDLEWARE -------------------
function checkRole(requiredRoles) {
  return (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient role permissions" });
    }
    next();
  };
}

// ------------------- PROTECTED ROUTES -------------------

// Admin-only route
app.get("/admin/dashboard", verifyToken, checkRole(["Admin"]), (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.username}! This is your dashboard.` });
});

// Moderator-only route
app.get("/moderator/manage", verifyToken, checkRole(["Admin", "Moderator"]), (req, res) => {
  res.json({ message: `Hello ${req.user.role} ${req.user.username}, you can manage users here.` });
});

// User route (accessible to all roles)
app.get("/user/profile", verifyToken, checkRole(["Admin", "Moderator", "User"]), (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is your profile.` });
});

// ------------------- START SERVER -------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
