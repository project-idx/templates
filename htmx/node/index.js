const express = require('express');
const app = express();
const port = process.argv[3] || 9000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/api/data', (req, res) => {
  res.send('Hello World - loaded via htmx!');
});