const express = require('express');
const router = express.Router();
const { sql, getPool } = require('../db');

const trim = (v) => (typeof v === 'string' ? v.trim() : v);

// GET all vehicles
router.get('/', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .query('SELECT * FROM Vehicles ORDER BY vehicleId');
    const vehicles = result.recordset.map(v => ({ ...v, vehicleId: trim(v.vehicleId) }));
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET one vehicle
router.get('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.Char(4), req.params.id.padEnd(4))
      .query('SELECT * FROM Vehicles WHERE vehicleId = @id');
    if (!result.recordset.length)
      return res.status(404).json({ error: 'Vehicle not found' });
    const v = result.recordset[0];
    res.json({ ...v, vehicleId: trim(v.vehicleId) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST create vehicle
router.post('/', async (req, res) => {
  const {
    vehicleId, make, model, manufactureYear,
    licensePlate, color, mileage, dailyRentRate,
    status, lastServiceDate,
  } = req.body;

  try {
    const pool = await getPool();
    await pool.request()
      .input('vehicleId',      sql.Char(4),      vehicleId.padEnd(4))
      .input('make',           sql.VarChar(30),  make)
      .input('model',          sql.VarChar(30),  model)
      .input('manufactureYear',sql.Char(4),      String(manufactureYear))
      .input('licensePlate',   sql.VarChar(10),  licensePlate)
      .input('color',          sql.VarChar(10),  color)
      .input('mileage',        sql.Float,        parseFloat(mileage))
      .input('dailyRentRate',  sql.Money,        parseFloat(dailyRentRate))
      .input('status',         sql.VarChar(10),  status)
      .input('lastServiceDate',sql.Date,         lastServiceDate || null)
      .query(`
        INSERT INTO Vehicles
          (vehicleId, make, model, manufactureYear, licensePlate, color, mileage, dailyRentRate, status, lastServiceDate)
        VALUES
          (@vehicleId, @make, @model, @manufactureYear, @licensePlate, @color, @mileage, @dailyRentRate, @status, @lastServiceDate)
      `);
    res.status(201).json({ message: 'Vehicle added successfully' });
  } catch (err) {
    console.error(err);
    if (err.number === 2627)
      return res.status(409).json({ error: 'Vehicle ID already exists' });
    res.status(500).json({ error: err.message });
  }
});

// PUT update vehicle
router.put('/:id', async (req, res) => {
  const {
    make, model, manufactureYear,
    licensePlate, color, mileage, dailyRentRate,
    status, lastServiceDate,
  } = req.body;

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id',             sql.Char(4),      req.params.id.padEnd(4))
      .input('make',           sql.VarChar(30),  make)
      .input('model',          sql.VarChar(30),  model)
      .input('manufactureYear',sql.Char(4),      String(manufactureYear))
      .input('licensePlate',   sql.VarChar(10),  licensePlate)
      .input('color',          sql.VarChar(10),  color)
      .input('mileage',        sql.Float,        parseFloat(mileage))
      .input('dailyRentRate',  sql.Money,        parseFloat(dailyRentRate))
      .input('status',         sql.VarChar(10),  status)
      .input('lastServiceDate',sql.Date,         lastServiceDate || null)
      .query(`
        UPDATE Vehicles SET
          make            = @make,
          model           = @model,
          manufactureYear = @manufactureYear,
          licensePlate    = @licensePlate,
          color           = @color,
          mileage         = @mileage,
          dailyRentRate   = @dailyRentRate,
          status          = @status,
          lastServiceDate = @lastServiceDate
        WHERE vehicleId = @id
      `);
    if (!result.rowsAffected[0])
      return res.status(404).json({ error: 'Vehicle not found' });
    res.json({ message: 'Vehicle updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE vehicle
router.delete('/:id', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('id', sql.Char(4), req.params.id.padEnd(4))
      .query('DELETE FROM Vehicles WHERE vehicleId = @id');
    if (!result.rowsAffected[0])
      return res.status(404).json({ error: 'Vehicle not found' });
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
