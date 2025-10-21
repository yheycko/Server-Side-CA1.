const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
  const { first_name, last_name, email, phone_number, eircode } = req.body;

  try {
    await db.insertUser({ first_name, last_name, email, phone_number, eircode });
    res.send("Data inserted successfully!");
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Server error. Please try again later.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});