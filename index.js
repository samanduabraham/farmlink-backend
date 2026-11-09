const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'FarmLink backend is up and running!' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running live on port ${PORT}`);
});