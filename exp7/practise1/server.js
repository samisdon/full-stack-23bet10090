const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS

// Sample product data
const products = [
    { id: 1, name: "Laptop", price: 800 },
    { id: 2, name: "Smartphone", price: 500 },
    { id: 3, name: "Headphones", price: 100 },
];

// Route to fetch products
app.get('/products', (req, res) => {
    res.json(products);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
