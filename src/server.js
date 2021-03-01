'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('./models/client');
const mongoose = require('mongoose');
const Client = mongoose.model('client');

// middleware
const errorHandler = require('../error-handlers/500.js');
const notFound = require('../error-handlers/404.js');
const apiRoutes = require('./routes/apiRoutes.js');
const logger = require('./middleware/logger.js');

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


// app.get('/', (req, res) => {
//   console.log('routes connected');
// })
app.use('/client', apiRoutes);

app.use(logger);
app.use('*', notFound);
app.use(errorHandler);

function start(PORT) {
  app.listen(PORT, () => {
    console.log('Listening on port', PORT);
    if (!PORT) { throw new Error('There is no port'); }
  })
}

module.exports = {
  server: app,
  start: start
}