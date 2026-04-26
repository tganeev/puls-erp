const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const aiRoutes = require('./routes/ai');
const objectsRoutes = require('./routes/objects');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Маршруты
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/objects', objectsRoutes);

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});