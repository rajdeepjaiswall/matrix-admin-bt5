import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import pkg from 'pg';

const { Pool } = pkg;

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/hostels', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM hostels ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/hostels', async (req, res) => {
  const {
    name,
    addressLine1,
    addressLine2,
    city,
    state,
    pincode,
    numRooms,
    roomTypes,
    amenities,
    ownerName,
    ownerEmail,
    ownerPhone
  } = req.body;
  const ownerId = uuidv4();
  const password = uuidv4().slice(0, 8);
  const hashed = await bcrypt.hash(password, 10);
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const userQuery = `INSERT INTO users(id, name, email, phone, role, password) VALUES($1,$2,$3,$4,$5,$6)`;
    await client.query(userQuery, [ownerId, ownerName, ownerEmail, ownerPhone, 'hostel_admin', hashed]);
    const hostelQuery = `INSERT INTO hostels(name, address_line1, address_line2, city, state, pincode, num_rooms, room_types, amenities, owner_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`;
    const { rows } = await client.query(hostelQuery, [name, addressLine1, addressLine2, city, state, pincode, numRooms, roomTypes, amenities, ownerId]);
    await client.query('COMMIT');
    res.json({ hostel: rows[0], credentials: { ownerId, password } });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
