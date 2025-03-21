const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

app.post('/api/data', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Received data for ${name}` });
});

module.exports = app;
module.exports.handler = serverless(app);
