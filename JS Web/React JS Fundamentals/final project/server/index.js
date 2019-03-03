const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');
require('./database/database')();
const port = 9999;
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

// General error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
  next();
});

app.listen(port, () => { console.log(`REST API listening on port: ${port}`) });