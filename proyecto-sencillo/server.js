require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./conexion');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Obtener todos los registros
app.get('/api/registros', (req, res) => {
  db.all('SELECT * FROM registros', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Obtener un registro por id
app.get('/api/registros/:id', (req, res) => {
  db.get('SELECT * FROM registros WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }
    res.json(row);
  });
});

// Crear un registro
app.post('/api/registros', (req, res) => {
  const { nombre, categoria, fecha, monto, notas } = req.body;
  db.run(
    'INSERT INTO registros (nombre, categoria, fecha, monto, notas) VALUES (?, ?, ?, ?, ?)',
    [nombre, categoria, fecha, monto, notas],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Actualizar un registro
app.put('/api/registros/:id', (req, res) => {
  const { nombre, categoria, fecha, monto, notas } = req.body;
  db.run(
    'UPDATE registros SET nombre = ?, categoria = ?, fecha = ?, monto = ?, notas = ? WHERE id = ?',
    [nombre, categoria, fecha, monto, notas, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ changes: this.changes });
    }
  );
});

// Eliminar un registro
app.delete('/api/registros/:id', (req, res) => {
  db.run('DELETE FROM registros WHERE id = ?', [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ changes: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
