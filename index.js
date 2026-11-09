const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Temporary in-memory fallback until your database table is created
let products = [
  { id: 1, title: 'Fresh Organic Tomatoes', category: 'Vegetables', price: '45.00', quantity: '40 Crates', location: 'Techiman', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: 'Ripe Sweet Plantains', category: 'Fruits', price: '30.00', quantity: '80 Bunches', location: 'Kumasi Central', image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: 'White Maize (Dry)', category: 'Grains', price: '120.00', quantity: '15 Bags', location: 'Tamale Silos', image: 'https://images.unsplash.com/photo-1551754655-cd97e68e27ca?auto=format&fit=crop&w=600&q=80' },
  { id: 4, title: 'Fresh Red Onions', category: 'Vegetables', price: '85.00', quantity: '25 Sacks', location: 'Bawku', image: 'https://images.unsplash.com/photo-1618512497248-8d06ea1aaae4?auto=format&fit=crop&w=600&q=80' }
];

// Health Check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'FarmLink live API is running!' });
});

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// POST new product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: Date.now(),
    ...req.body
  };
  products.unshift(newProduct);
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});