require('dotenv').config();
const express = require('express');
const cors = require('cors');
const vehiclesRouter = require('./routes/vehicles');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/vehicles', vehiclesRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Car Rental API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
