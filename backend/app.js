const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Koneksi ke MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'spk2',
});

// Tambahkan middleware untuk memproses body JSON
app.use(express.json());

// Tambahkan middleware CORS
app.use(cors());

// Endpoint untuk mendapatkan data karyawan
app.get('/employee', (req, res) => {
  const query = 'SELECT * FROM employee';

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(results);
    }
  });
});
app.post('/employee', (req, res) => {
  const { nama, email, role, start_date, end_date, mandays, feedback, delivery, score, extra_miles } = req.body;
  const query = 'INSERT INTO employee (nama, email, role, start_date, end_date, mandays, feedback, delivery, score, extra_miles) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(query, [nama, email, role, start_date, end_date, mandays, feedback, delivery, score, extra_miles], (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send('Employee added successfully');
    }
  });
});

// Endpoint untuk mengupdate data karyawan
app.put('/employee/:id', (req, res) => {
  const employeeId = req.params.id;
  const { nama, email, role, start_date, end_date, mandays, feedback, delivery, score, extra_miles } = req.body;
  const query = 'UPDATE employee SET nama=?, email=?, role=?, start_date=?, end_date=?, mandays=?, feedback=?, delivery=?, score=?, extra_miles=? WHERE id=?';

  db.query(query, [nama, email, role, start_date, end_date, mandays, feedback, delivery, score, extra_miles, employeeId], (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send('Employee updated successfully');
    }
  });
});

// Endpoint untuk menghapus data karyawan
app.delete('/employee/:id', (req, res) => {
  const employeeId = req.params.id;
  const query = 'DELETE FROM employee WHERE id=?';

  db.query(query, [employeeId], (err, results) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send('Employee deleted successfully');
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
