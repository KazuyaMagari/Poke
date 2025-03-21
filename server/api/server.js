const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.send('hello')
});

app.post('/api/data', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Received data for ${name}` });
});
app.listen(3000);

module.exports = app;
module.exports.handler = serverless(app);
