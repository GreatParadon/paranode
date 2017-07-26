const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const chalk = require('chalk');
const dotenv = require('dotenv').config();

app = express();
app.set('port', process.env.PORT);

// Connect Database
require('./config/database.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(morgan('dev'));

// Add headers
app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers',
      'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// Define Route
// routeImport
app.use('/', (req, res) => {
  res.json({message: 'Welcome to Node Backend'});
});

// Server connect
const port = app.get('port');
app.listen(port, () => {
  console.log(chalk.green(`Server started on port ${port}`));
});

module.exports = app;