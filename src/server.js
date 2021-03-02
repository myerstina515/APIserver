'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
require('./models/client');
const mongoose = require('mongoose');
const Client = mongoose.model('client');

app.use(cors());
app.use(morgan('dev'));

// middleware
const errorHandler = require('../error-handlers/500.js');
const notFound = require('../error-handlers/404.js');
const apiRoutes = require('./routes/apiRoutes.js');
const logger = require('./middleware/logger.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(function (req, res, next) {

//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   next();
// });
const whitelist = ['http://localhost:3000', 'https://tedashi-trained.herokuapp.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


// app.get('/', (req, res) => {
//   console.log('routes connected');
// })
app.use('/client', cors(corsOptions), apiRoutes);

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