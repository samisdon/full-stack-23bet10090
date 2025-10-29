const express = require('express');
const app = express();
const PORT = 3000;

// ========================
// Logging Middleware
// ========================
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); // Move to the next middleware/route handler
};

// Apply logging middleware globally
app.use(logger);

// ========================
// Bearer Token Authentication Middleware
// ========================
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // get Authorization header

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    if (token === 'mysecrettoken') {
        next(); // token is valid, proceed to the protected route
    } else {
        return res.status(403).json({ error: 'Invalid or missing token' });
    }
};

// ========================
// Routes
// ========================

// Public route (no authentication needed)
app.get('/public', (req, res) => {
    res.json({ message: 'This is a public route. No token needed.' });
});

// Protected route (authentication required)
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Welcome! You have access to this protected route.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
