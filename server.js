const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let purchaseHistory = [];

// Route to get purchase history (GET request)
app.get('/purchases', (req, res) => {
    res.json(purchaseHistory);
});

// Route to add a purchase (POST request)
app.post('/purchase', (req, res) => {
    const { game, price } = req.body;
    if (!game || !price) {
        return res.status(400).json({ error: 'Game and price are required' });
    }
    const newPurchase = { game, price, date: new Date().toLocaleString() };
    purchaseHistory.push(newPurchase);
    res.json({ message: 'Purchase added!', purchase: newPurchase });
});
app.delete('/clear', (req, res) => {
    purchaseHistory = [];
    res.json({ message: 'Purchase history cleared!' });
});


app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
