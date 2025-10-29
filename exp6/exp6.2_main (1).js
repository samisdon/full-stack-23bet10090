const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Secret key for JWT signing
const SECRET_KEY = 'mybanksecretkey';

// Parse JSON request bodies
app.use(bodyParser.json());

// Hardcoded user (for demo purposes)
const user = {
    username: 'john',
    password: 'password123',
    balance: 1000
};

// ========================
// JWT Authentication Middleware
// ========================
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = decoded; // Attach decoded user info to request
        next();
    });
};

// ========================
// Login Route
// ========================
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Simple validation against hardcoded user
    if (username === user.username && password === user.password) {
        const payload = { username: user.username };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

        return res.json({ token });
    } else {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
});

// ========================
// Protected Banking Routes
// ========================

// View balance
app.get('/balance', authenticateJWT, (req, res) => {
    res.json({ balance: user.balance });
});

// Deposit money
app.post('/deposit', authenticateJWT, (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid deposit amount' });
    }

    user.balance += amount;
    res.json({ message: `Deposited ${amount} successfully`, balance: user.balance });
});

// Withdraw money
app.post('/withdraw', authenticateJWT, (req, res) => {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid withdrawal amount' });
    }

    if (amount > user.balance) {
        return res.status(400).json({ error: 'Insufficient balance' });
    }

    user.balance -= amount;
    res.json({ message: `Withdrew ${amount} successfully`, balance: user.balance });
});

// Start server
app.listen(PORT, () => {
    console.log(`Banking API running on http://localhost:${PORT}`);
});
