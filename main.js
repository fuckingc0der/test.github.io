const express = require('express');
const db = require('./database');
const app = express();

app.use(express.json());

// Добавление в избранное
app.post('/add-favorite', (req, res) => {
    const { productId } = req.body;
    db.run("INSERT INTO favorites (product_id) VALUES (?)", [productId], (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});

// Добавление в корзину
app.post('/add-cart', (req, res) => {
    const { productId } = req.body;
    db.run("INSERT INTO cart (product_id) VALUES (?)", [productId], (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});

// Очистка избранного
app.post('/clear-favorites', (req, res) => {
    db.run("DELETE FROM favorites", (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});

// Очистка корзины
app.post('/clear-cart', (req, res) => {
    db.run("DELETE FROM cart", (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});

app.listen(3000, () => {
    console.log("Сервер запущен на порту 3000");
});
