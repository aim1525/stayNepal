const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.get('/', (req, res) => {
  res.json({ message: 'StayNepal API is running!' });
});

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, password_hash, role || 'tourist']
    );
    const token = jwt.sign(
      { id: result.rows[0].id, role: result.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.status(201).json({ user: result.rows[0], token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(400).json({ message: 'Wrong password' });
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL HOMESTAYS
app.get('/api/homestays', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT homestays.*, users.name as host_name FROM homestays JOIN users ON homestays.host_id = users.id ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD NEW HOMESTAY
app.post('/api/homestays', async (req, res) => {
  try {
    const { host_id, name_en, name_ne, district, price_per_night, description_en, description_ne, cultural_experiences } = req.body;
    const result = await pool.query(
      'INSERT INTO homestays (host_id, name_en, name_ne, district, price_per_night, description_en, description_ne, cultural_experiences) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
      [host_id, name_en, name_ne, district, price_per_night, description_en, description_ne, cultural_experiences]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET SINGLE HOMESTAY
app.get('/api/homestays/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT homestays.*, users.name as host_name FROM homestays JOIN users ON homestays.host_id = users.id WHERE homestays.id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Homestay not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE BOOKING
app.post('/api/bookings', async (req, res) => {
  try {
    const { tourist_id, homestay_id, check_in, check_out, guests, total_price } = req.body
    const result = await pool.query(
      'INSERT INTO bookings (tourist_id, homestay_id, check_in, check_out, guests, total_price) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [tourist_id, homestay_id, check_in, check_out, guests, total_price]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET MY BOOKINGS
app.get('/api/bookings/user/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT bookings.*, homestays.name_en, homestays.district FROM bookings JOIN homestays ON bookings.homestay_id = homestays.id WHERE tourist_id = $1 ORDER BY created_at DESC',
      [req.params.id]
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET REVIEWS FOR A HOMESTAY
app.get('/api/reviews/:homestay_id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT reviews.*, users.name as tourist_name 
       FROM reviews 
       JOIN users ON reviews.tourist_id = users.id 
       WHERE homestay_id = $1 
       ORDER BY reviews.created_at DESC`,
      [req.params.homestay_id]
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// ADD REVIEW
app.post('/api/reviews', async (req, res) => {
  try {
    const { tourist_id, homestay_id, rating, comment } = req.body
    const result = await pool.query(
      'INSERT INTO reviews (tourist_id, homestay_id, rating, comment) VALUES ($1,$2,$3,$4) RETURNING *',
      [tourist_id, homestay_id, rating, comment]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('StayNepal server running on port ' + PORT);
});