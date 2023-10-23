const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bookticket"
});

app.get('/gettickets', (req, res) => {
    const selectQuery = 'SELECT * FROM ticketsdata';
  
    db.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Failed to retrieve data from the database', details: err.message });
      }

      return res.status(200).json(results);
    });
  });

  
app.post('/booktickets', async (req, res) => {
    const { numberOfTickets, seatStatus, seatId } = req.body;
  
    if (!seatId || !Array.isArray(seatId) || seatId.length === 0) {
      return res.status(400).json({ error: 'Invalid seatId data' });
    }
  
    const insertQuery = 'INSERT INTO ticketsdata (seatId, numberOfTickets, seatStatus) VALUES ?';
    const values = seatId.map(id => [id, numberOfTickets, seatStatus]);
  
    db.query(insertQuery, [values], (err, result) => {
      if (err) {
        console.error('Error:', err);
        return res.status(500).json({ error: 'Failed to insert data into the database', details: err.message }); // Send error details to the client
      }
  
      console.log('Inserted', result.affectedRows, 'rows.');
      return res.json(result);
    });
  });
  

app.listen(5000, () => {
  console.log("Server has started at port 5000");
});
