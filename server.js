const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let waitingList = [];
let reserve = [];

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/tables', (req, res) =>
  res.sendFile(path.join(__dirname, 'tables.html'))
);
app.get('/reserves', (req, res) =>
  res.sendFile(path.join(__dirname, 'reserves'))
);

app.get('/api/tables', (req, res) => {
  res.json(reserve);
});

app.get('/api/waitinglist', (req, res) => {
  res.json(waitingList);
});

app.post('/tables', (req, res) => {
  const reservation = req.body;

  if (reserve.length < 6) {
    reserve.push(reservation);
  } else {
    waitingList.push(reservation);
  }
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
