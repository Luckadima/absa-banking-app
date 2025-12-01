const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// === Middleware ===
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'Uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: './Uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// === PostgreSQL connection ===
const websitePool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'WebsiteDB',
  password: 'Stop@town53000',
  port: 5432,
});

websitePool.connect()
  .then(client => {
    console.log("✅ Connected to Website DB (WebsiteDB)");
    client.release();
  })
  .catch(err => console.error("❌ Website DB connection error", err.stack));

// === Documents API ===

// Upload new document
app.post('/api/upload', upload.single('file'), async (req, res) => {
  const { type, businessName, userId } = req.body;
  const file = req.file;

  if (!type || !file) {
    return res.status(400).json({ error: 'Missing required fields: type or file' });
  }

  try {
    const name = file.originalname;
    const uploadDate = new Date();
    const status = 'Pending';
    const statusColor = 'pending';

    const result = await websitePool.query(
      `INSERT INTO documents (user_id, name, type, upload_date, status)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId || null, name, type, uploadDate, status]
    );

    res.status(201).json({
      message: 'Document uploaded successfully',
      document: {
        id: result.rows[0].id,
        userId: result.rows[0].user_id,
        name: result.rows[0].name,
        type: result.rows[0].type,
        uploadDate: result.rows[0].upload_date.toISOString().split('T')[0],
        status: result.rows[0].status,
        statusColor: statusColor
      }
    });
  } catch (err) {
    console.error('Error uploading document:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Get all documents
app.get('/api/documents', async (req, res) => {
  try {
    const result = await websitePool.query(
      `SELECT * FROM documents ORDER BY upload_date DESC`
    );
    const documents = result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      name: row.name,
      type: row.type,
      uploadDate: row.upload_date.toISOString().split('T')[0],
      status: row.status,
      statusColor: row.status === 'Pending' ? 'pending' : row.status === 'Verified' ? 'verified' : 'action'
    }));
    res.json(documents);
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

// === Start server ===
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running at http://0.0.0.0:${port}`);
});