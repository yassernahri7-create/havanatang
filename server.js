const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Priority routes
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.use(express.static(__dirname));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const DATA_FILE = path.join(__dirname, 'data.json');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, 'uploads')),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

function readData() {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Ensure init_db runs
require('./init_db');

app.get('/api/data', (req, res) => res.json(readData()));

app.post('/api/data', (req, res) => {
    writeData(req.body);
    res.json({ success: true });
});

app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ url: '/uploads/' + req.file.filename });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const data = readData();

    // Check against data.json OR fallback to the requested credentials
    const isValid = (data.auth && data.auth.username === username && data.auth.password === password) ||
        (username === 'admin' && password === '6543210');

    if (isValid) {
        // If it was the fallback login, ensure we have auth in data for next time
        if (!data.auth) {
            data.auth = { username: 'admin', password: '6543210' };
            writeData(data);
        }
        res.json({ success: true, user: data.auth.username });
    } else {
        res.status(401).json({ error: 'Invalid username or password' });
    }
});


app.get('/health', (req, res) => res.json({ status: 'OK', time: new Date() }));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`=========================================`);
    console.log(`Havana Beach Club - Server Started!`);
    console.log(`Port: ${PORT}`);
    console.log(`Main Site: http://localhost:${PORT}/`);
    console.log(`Admin Site: http://localhost:${PORT}/admin`);
    console.log(`Try this if localhost fails: http://127.0.0.1:${PORT}/`);
    console.log(`=========================================`);
});
